// Runs a solution against a problem's tests and grades each one.
//
// Every language's runner prints the same small protocol on standard output:
//   @@BEGIN <n>             test n is about to call the solution
//   @@RESULT <n> <value>    the solution returned
//   @@ERROR <n> <message>   the solution threw
//   @@LOAD <message>        the solution file could not be loaded at all
// Any other line is the solution's own debug output.
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { isDeepStrictEqual } = require('node:util');
const { expand } = require('./problems.js');

const TIME_LIMIT_MS = 2000;
const MAX_DEBUG_LINES = 12;

function encodeString(text) {
  const bytes = Buffer.from(text, 'utf8');
  return `${bytes.length} ${bytes.length ? bytes.toString('hex') : '-'}`;
}

// The compiled runners read whitespace-separated tokens rather than JSON.
function encodeValue(type, value) {
  switch (type) {
    case 'int':
      return String(value);
    case 'bool':
      return value ? '1' : '0';
    case 'string':
      return encodeString(value);
    case 'int[]':
      return [value.length, ...value].join(' ');
    case 'string[]':
      return [value.length, ...value.map(encodeString)].join(' ');
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}

// Returns { value } when the result could be read, or { raw } when it could not.
function decodeResult(payload) {
  const space = payload.indexOf(' ');
  const tag = space === -1 ? payload : payload.slice(0, space);
  const rest = space === -1 ? '' : payload.slice(space + 1);
  switch (tag) {
    case 'j':
      try {
        return { value: JSON.parse(rest) };
      } catch {
        return { raw: rest };
      }
    case 'i':
      return { value: Number(rest) };
    case 'b':
      return { value: rest === '1' };
    case 's': {
      const hex = rest.split(' ')[1];
      return { value: hex === '-' ? '' : Buffer.from(hex, 'hex').toString('utf8') };
    }
    case 'a':
      return { value: rest.split(' ').slice(1).map(Number) };
    case 'null':
      return { value: null };
    default:
      return { raw: payload };
  }
}

// Starts the runner at test `start` and records results until it stops,
// whether that is because it finished, crashed, or ran out of time.
function runOnce(plan, start, results, limitMs) {
  return new Promise((resolve) => {
    const child = spawn(plan.command, [...plan.args, String(start)], { windowsHide: true });
    const outcome = { began: false, timedOut: false, loadError: null, stderr: '', code: null };
    let pending = '';
    let current = -1;
    let timer = null;

    const handle = (line) => {
      const marker = /^@@(BEGIN|RESULT|ERROR|LOAD) ?(.*)$/.exec(line);
      if (!marker) {
        if (current >= 0 && results[current].output.length < MAX_DEBUG_LINES) {
          results[current].output.push(line);
        }
        return;
      }
      const [, kind, rest] = marker;
      if (kind === 'LOAD') {
        outcome.loadError = rest;
        return;
      }
      if (kind === 'BEGIN') {
        current = Number(rest);
        outcome.began = true;
        results[current].status = 'running';
        timer = setTimeout(() => {
          outcome.timedOut = true;
          child.kill();
        }, limitMs);
        return;
      }
      clearTimeout(timer);
      const space = rest.indexOf(' ');
      const index = Number(space === -1 ? rest : rest.slice(0, space));
      const text = space === -1 ? '' : rest.slice(space + 1);
      if (kind === 'RESULT') {
        Object.assign(results[index], { status: 'returned' }, decodeResult(text));
      } else {
        Object.assign(results[index], { status: 'error', message: text });
      }
      current = -1;
    };

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
      pending += chunk;
      let end = pending.indexOf('\n');
      while (end !== -1) {
        handle(pending.slice(0, end).replace(/\r$/, ''));
        pending = pending.slice(end + 1);
        end = pending.indexOf('\n');
      }
    });
    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (chunk) => {
      outcome.stderr += chunk;
    });
    child.on('error', (error) => {
      outcome.loadError = `Could not start "${plan.command}": ${error.message}`;
      resolve(outcome);
    });
    child.on('close', (code) => {
      clearTimeout(timer);
      if (pending) handle(pending);
      outcome.code = code;
      resolve(outcome);
    });
  });
}

// Runs every test. Returns { compileError }, { loadError }, or
// { tests, results, warnings, limitMs } where each result has a status of
// pass, fail, error, timeout or crash.
async function runTests(problem, language, solutionPath, buildDir) {
  fs.mkdirSync(buildDir, { recursive: true });
  const tests = problem.tests.map((test) => ({ ...test, args: test.args.map(expand) }));
  const jsonPath = path.join(buildDir, 'tests.json');
  const textPath = path.join(buildDir, 'tests.txt');
  const encoded = tests.map((test) =>
    test.args.map((arg, index) => encodeValue(problem.params[index][1], arg)).join('\n'),
  );
  fs.writeFileSync(jsonPath, JSON.stringify(tests.map((test) => test.args)));
  fs.writeFileSync(textPath, `${[tests.length, ...encoded].join('\n')}\n`);

  const plan = language.prepare({ problem, solutionPath, buildDir, jsonPath, textPath });
  if (plan.error) {
    return { compileError: plan.error };
  }

  const limitMs = TIME_LIMIT_MS * (language.timeScale ?? 1);
  const results = tests.map(() => ({ status: 'not-run', output: [] }));
  let start = 0;
  while (start < tests.length) {
    const outcome = await runOnce(plan, start, results, limitMs);
    if (outcome.loadError) {
      return { loadError: outcome.loadError };
    }
    if (!outcome.began) {
      return { loadError: outcome.stderr.trim() || `The program stopped before running any test (exit code ${outcome.code}).` };
    }
    // The first unfinished test is the one that stopped the runner. Mark it
    // and carry on from the test after it.
    const stopped = results.findIndex((result, index) => index >= start && !['returned', 'error'].includes(result.status));
    if (stopped === -1) {
      break;
    }
    if (outcome.timedOut) {
      results[stopped].status = 'timeout';
    } else {
      const detail = outcome.stderr.trim().split(/\r?\n/).slice(0, 3).join(' ');
      Object.assign(results[stopped], { status: 'crash', code: outcome.code, message: detail });
    }
    start = stopped + 1;
  }

  results.forEach((result, index) => {
    if (result.status === 'returned') {
      result.status = 'value' in result && isDeepStrictEqual(result.value, tests[index].expected) ? 'pass' : 'fail';
    }
  });
  return { tests, results, warnings: plan.warnings, limitMs };
}

module.exports = { runTests };
