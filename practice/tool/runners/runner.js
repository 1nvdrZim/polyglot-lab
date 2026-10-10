// Test runner for JavaScript solutions.
//   node runner.js <solution.js> <tests.json> <first test to run>
// It prints one "@@" line per test for the tool to read. Anything else that
// reaches standard output is shown to you as your own debug output.
const fs = require('node:fs');
const { format } = require('node:util');

const [solutionPath, testsPath, start] = process.argv.slice(2);

// Synchronous writes keep the output in order even if the solution never returns.
const emit = (line) => fs.writeSync(1, `${line}\n`);
for (const method of ['log', 'info', 'warn', 'error', 'debug']) {
  console[method] = (...values) => emit(format(...values));
}

function describe(error) {
  if (!(error instanceof Error)) {
    return `threw ${String(error)}`;
  }
  const text = `${error.name}: ${error.message}`.replace(/\s+/g, ' ');
  const line = /solution\.js:(\d+)/.exec(error.stack ?? '');
  return line ? `${text} (solution.js line ${line[1]})` : text;
}

let solution;
try {
  solution = require(solutionPath);
} catch (error) {
  emit(`@@LOAD ${describe(error)}`);
  process.exit(0);
}
if (typeof solution !== 'function') {
  emit('@@LOAD solution.js must end with: module.exports = <your function>;');
  process.exit(0);
}

const tests = JSON.parse(fs.readFileSync(testsPath, 'utf8'));
for (let index = Number(start); index < tests.length; index++) {
  emit(`@@BEGIN ${index}`);
  try {
    const result = solution(...tests[index]);
    emit(`@@RESULT ${index} j ${JSON.stringify(result) ?? 'undefined'}`);
  } catch (error) {
    emit(`@@ERROR ${index} ${describe(error)}`);
  }
}
