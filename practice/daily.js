#!/usr/bin/env node
// Daily practice: one assessment-style problem a day, in the language you
// choose. Run `node practice/daily.js help` for the commands.
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline/promises');
const { PRACTICE_DIR, loadProblems, findProblem } = require('./tool/problems.js');
const { LANGUAGES, findLanguage, writeStarter } = require('./tool/languages.js');
const { runTests } = require('./tool/run.js');

const ROOT = path.join(PRACTICE_DIR, '..');
const BUILD_DIR = path.join(ROOT, 'build', 'practice');
// What you have solved is kept in the repository; the problem you are in the
// middle of is only a local note, so it lives in the ignored build folder.
const PROGRESS_FILE = path.join(PRACTICE_DIR, 'progress.json');
const SESSION_FILE = path.join(BUILD_DIR, 'session.json');
const TARGET_MINUTES = { easy: 15, medium: 30 };
const COMMAND = process.platform === 'win32' ? '.\\daily' : 'node practice/daily.js';

// ---------- small helpers ----------

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function localDate(date = new Date()) {
  const pad = (number) => String(number).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Days in a row with at least one solve, ending today (or yesterday, if
// nothing has been solved yet today).
function streak(solved) {
  const days = new Set(solved.map((entry) => entry.date));
  const cursor = new Date();
  if (!days.has(localDate(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  let count = 0;
  while (days.has(localDate(cursor))) {
    count++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;

function wrap(text, indent = '') {
  const lines = [];
  let line = indent;
  for (const word of text.split(' ')) {
    if (line.trim() && line.length + word.length + 1 > 78) {
      lines.push(line);
      line = indent + word;
    } else {
      line = line.trim() ? `${line} ${word}` : indent + word;
    }
  }
  if (line.trim()) lines.push(line);
  return lines.join('\n');
}

function show(value) {
  const format = (item) => (Array.isArray(item) ? `[${item.map(format).join(', ')}]` : JSON.stringify(item));
  const text = value === undefined ? 'undefined' : format(value);
  return text.length > 70 ? `${text.slice(0, 67)}...` : text;
}

function solutionPath(problem, language) {
  return path.join(problem.dir, language.id, language.file);
}

function printStatement(problem) {
  console.log(`\n${fs.readFileSync(path.join(problem.dir, 'README.md'), 'utf8').trim()}\n`);
}

// The problem and language being worked on, or null.
function currentSession(problems) {
  const saved = readJson(SESSION_FILE, null);
  if (!saved) return null;
  const problem = findProblem(problems, saved.problem);
  const language = findLanguage(saved.language);
  return problem && language ? { problem, language, saved } : null;
}

function nextProblem(problems, progress) {
  return problems.find((problem) => !progress.solved.some((entry) => entry.problem === problem.id));
}

async function chooseLanguage() {
  if (!process.stdin.isTTY) return null;
  console.log('Which language?');
  LANGUAGES.forEach((language, index) => console.log(`  ${index + 1}. ${language.name}`));
  const prompt = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = (await prompt.question('> ')).trim();
  prompt.close();
  return LANGUAGES[Number(answer) - 1] ?? findLanguage(answer) ?? null;
}

const languageChoices = () => LANGUAGES.map((language) => language.id).join(' | ');

// Creates the starter file if needed and makes this the problem in progress.
function begin(problem, language, session) {
  const file = solutionPath(problem, language);
  const created = writeStarter(problem, language, file);
  const resuming = session && session.problem === problem && session.language === language;
  if (!resuming) {
    writeJson(SESSION_FILE, {
      problem: problem.id,
      language: language.id,
      started: new Date().toISOString(),
      hints: 0,
    });
  }
  console.log(`${problem.number} ${problem.title} in ${language.name}`);
  console.log(`  Your file:   ${path.relative(process.cwd(), file)}${created ? '' : '  (already there; left as it was)'}`);
  console.log(`  Run tests:   ${COMMAND} test`);
  console.log(`  Get a hint:  ${COMMAND} hint`);
}

// ---------- commands ----------

async function showToday(problems, progress) {
  const session = currentSession(problems);
  if (session) {
    console.log('In progress:');
    printStatement(session.problem);
    begin(session.problem, session.language, session);
    return;
  }

  const next = nextProblem(problems, progress);
  if (progress.solved.some((entry) => entry.date === localDate())) {
    console.log(`Today's problem is done. Streak: ${plural(streak(progress.solved), 'day')}.`);
    if (next) {
      console.log(`Next up is ${next.number} ${next.title}. To start it now: ${COMMAND} <language>`);
    }
    console.log(`To redo an earlier problem in another language: ${COMMAND} pick <number> <language>`);
    return;
  }
  if (!next) {
    console.log('You have solved every problem at least once.');
    console.log(`Redo one in another language: ${COMMAND} pick <number> <language>   (see ${COMMAND} list)`);
    return;
  }

  console.log("Today's problem:");
  printStatement(next);
  const language = await chooseLanguage();
  if (language) {
    begin(next, language, null);
  } else {
    console.log(`Choose a language to begin: ${COMMAND} ${languageChoices()}`);
  }
}

// `daily java`: carry on with the current problem in Java, or start the next one.
function startIn(problems, progress, language) {
  const session = currentSession(problems);
  const problem = session ? session.problem : nextProblem(problems, progress);
  if (!problem) {
    console.log(`Every problem is solved. Choose one to redo: ${COMMAND} pick <number> ${language.id}`);
    return;
  }
  if (!session) {
    printStatement(problem);
  }
  begin(problem, language, session);
}

async function pick(problems, [number, languageName]) {
  const problem = findProblem(problems, number ?? '');
  if (!problem) {
    console.log(`No problem matches "${number ?? ''}". See them all with: ${COMMAND} list`);
    process.exitCode = 1;
    return;
  }
  if (languageName && !findLanguage(languageName)) {
    console.log(`"${languageName}" is not one of: ${languageChoices()}`);
    process.exitCode = 1;
    return;
  }
  printStatement(problem);
  const language = languageName ? findLanguage(languageName) : await chooseLanguage();
  if (language) {
    begin(problem, language, currentSession(problems));
  } else {
    console.log(`Add a language: ${COMMAND} pick ${problem.number} ${languageChoices()}`);
  }
}

function printResult(problem, language, test, result, limitMs) {
  const call = test.label ?? `${language.functionName(problem)}(${test.args.map(show).join(', ')})`;
  if (result.status === 'pass') {
    console.log(`pass  ${call} -> ${show(result.value)}`);
  } else {
    console.log(`FAIL  ${call}`);
  }
  const detail = (text) => console.log(`      ${text}`);
  if (result.status === 'fail') {
    detail(`returned ${'value' in result ? show(result.value) : result.raw}`);
    detail(`expected ${show(test.expected)}`);
  } else if (result.status === 'error') {
    detail(`error: ${result.message}`);
  } else if (result.status === 'timeout') {
    detail(`time limit exceeded (${limitMs / 1000} s): the approach is too slow for this input, or a loop never ends`);
  } else if (result.status === 'crash') {
    detail(`the program crashed (exit code ${result.code})${result.message ? `: ${result.message}` : ''}`);
    if (language.id === 'c') {
      detail('in C this usually means reading or writing outside an array, or using a NULL pointer');
    }
  } else if (result.status !== 'pass') {
    detail('not run');
  }
  for (const line of result.output) {
    detail(`your output: ${line}`);
  }
}

function celebrate(progress, session) {
  const { problem, language, saved } = session;
  const earlier = progress.solved.find((entry) => entry.problem === problem.id && entry.language === language.id);
  fs.rmSync(SESSION_FILE, { force: true });
  if (earlier) {
    console.log(`\nAll tests pass. (${problem.number} in ${language.name} was already recorded on ${earlier.date}.)`);
    return;
  }

  const minutes = Math.round((Date.now() - Date.parse(saved.started)) / 60000);
  const entry = { problem: problem.id, language: language.id, date: localDate(), hints: saved.hints };
  // A problem left open overnight has no meaningful time.
  if (minutes <= 180) entry.minutes = minutes;
  progress.solved.push(entry);
  writeJson(PROGRESS_FILE, progress);

  const target = TARGET_MINUTES[problem.difficulty];
  console.log(`\nSolved: ${problem.number} ${problem.title} in ${language.name}`);
  if ('minutes' in entry) {
    const aim = target ? ` (aim for ${target} on ${problem.difficulty === 'easy' ? 'an easy' : 'a medium'} problem)` : '';
    console.log(`  Time:    ${minutes < 1 ? 'under a minute' : plural(minutes, 'minute')}${aim}`);
  }
  console.log(`  Hints:   ${saved.hints ? `${plural(saved.hints, 'extra hint')} used` : 'none beyond the nudge in the file'}`);
  console.log(`  Streak:  ${plural(streak(progress.solved), 'day')}`);
  console.log(`  Pattern: ${problem.pattern}`);
  console.log(wrap(problem.takeaway, '           '));
  console.log('\nSave your work:');
  console.log('  git add practice');
  console.log(`  git commit -m "Solve ${problem.number} ${problem.title.toLowerCase()} in ${language.name}"`);
  console.log(`\nTo solve it again in another language: ${COMMAND} pick ${Number(problem.number)} <language>`);
}

async function test(problems, progress) {
  const session = currentSession(problems);
  if (!session) {
    console.log(`Nothing is in progress. Start with: ${COMMAND}`);
    process.exitCode = 1;
    return;
  }
  const { problem, language } = session;
  const file = solutionPath(problem, language);
  if (!fs.existsSync(file)) {
    console.log(`${path.relative(process.cwd(), file)} is missing. Recreate it with: ${COMMAND} ${language.id}`);
    process.exitCode = 1;
    return;
  }

  console.log(`${problem.number} ${problem.title} in ${language.name}`);
  if (language.compiled) console.log('Compiling...');
  const outcome = await runTests(problem, language, file, path.join(BUILD_DIR, problem.id, language.id));

  const problemWithFile = outcome.compileError ?? outcome.loadError;
  if (problemWithFile) {
    console.log(outcome.compileError ? '\nYour code does not compile yet:\n' : '\nYour file could not be run:\n');
    console.log(problemWithFile.split(/\r?\n/).map((line) => `  ${line}`).join('\n'));
    if (/runner/i.test(problemWithFile)) {
      console.log('\nIf the message mentions the runner, check that the function name, parameters');
      console.log('and return type in your file still match the starter.');
    }
    process.exitCode = 1;
    return;
  }

  if (outcome.warnings) {
    console.log(`\nCompiler warnings:\n${outcome.warnings.split(/\r?\n/).map((line) => `  ${line}`).join('\n')}`);
  }
  console.log('');
  outcome.results.forEach((result, index) => printResult(problem, language, outcome.tests[index], result, outcome.limitMs));

  const passed = outcome.results.filter((result) => result.status === 'pass').length;
  console.log(`\n${passed} of ${outcome.results.length} passed`);
  if (passed === outcome.results.length) {
    celebrate(progress, session);
  } else {
    process.exitCode = 1;
  }
}

function hint(problems) {
  const session = currentSession(problems);
  if (!session) {
    console.log(`Nothing is in progress. Start with: ${COMMAND}`);
    process.exitCode = 1;
    return;
  }
  const { hints } = session.problem;
  // Hint 1 is the nudge already written at the top of the starter file.
  const next = session.saved.hints + 1;
  if (next >= hints.length) {
    console.log('There are no more hints for this problem. Here they all are:\n');
    hints.forEach((text, index) => console.log(`${wrap(`${index + 1}. ${text}`)}\n`));
    return;
  }
  writeJson(SESSION_FILE, { ...session.saved, hints: next });
  console.log(`Hint ${next + 1} of ${hints.length} for ${session.problem.number} ${session.problem.title}:\n`);
  console.log(wrap(hints[next]));
}

function list(problems, progress) {
  const columns = LANGUAGES.map((language) => language.name.padEnd(11)).join('');
  console.log(`${'#'.padEnd(5)}${'Problem'.padEnd(38)}${'Level'.padEnd(8)}${columns}`.trimEnd());
  for (const problem of problems) {
    const marks = LANGUAGES.map((language) => {
      const done = progress.solved.some((entry) => entry.problem === problem.id && entry.language === language.id);
      return (done ? 'done' : '-').padEnd(11);
    }).join('');
    console.log(`${problem.number.padEnd(5)}${problem.title.padEnd(38)}${problem.difficulty.padEnd(8)}${marks}`.trimEnd());
  }
  const started = new Set(progress.solved.map((entry) => entry.problem)).size;
  console.log(`\n${started} of ${problems.length} problems solved in at least one language. Streak: ${plural(streak(progress.solved), 'day')}.`);
}

function help() {
  console.log(`Daily practice

  ${COMMAND}                          show today's problem and choose a language
  ${COMMAND} <language>               start or continue today's problem in that language
  ${COMMAND} test                     run the tests for the problem in progress
  ${COMMAND} hint                     show the next hint (each one says a little more)
  ${COMMAND} list                     every problem and what you have solved
  ${COMMAND} pick <number> <language> work on a particular problem

Languages: ${languageChoices()}`);
}

async function main() {
  const [command, ...args] = process.argv.slice(2);
  const problems = loadProblems();
  const progress = readJson(PROGRESS_FILE, { solved: [] });

  if (!command) return showToday(problems, progress);
  const language = findLanguage(command);
  if (language) return startIn(problems, progress, language);

  switch (command) {
    case 'test':
      return test(problems, progress);
    case 'hint':
      return hint(problems);
    case 'list':
      return list(problems, progress);
    case 'pick':
      return pick(problems, args);
    case 'help':
      return help();
    default:
      console.log(`Unknown command "${command}".\n`);
      help();
      process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
