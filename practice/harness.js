// Runs a solution against a list of [arguments, expected] cases and prints one
// line per case, the way an assessment platform reports its results.
const { isDeepStrictEqual } = require('node:util');

function show(value) {
  const text = value === undefined ? 'undefined' : JSON.stringify(value);
  return text.length > 60 ? `${text.slice(0, 57)}...` : text;
}

function runCases(solution, cases) {
  let passed = 0;

  for (const [args, expected] of cases) {
    const call = `${solution.name}(${args.map(show).join(', ')})`;
    try {
      const actual = solution(...args);
      if (isDeepStrictEqual(actual, expected)) {
        passed++;
        console.log(`pass  ${call} -> ${show(actual)}`);
      } else {
        console.log(`FAIL  ${call} -> ${show(actual)}, expected ${show(expected)}`);
      }
    } catch (error) {
      console.log(`FAIL  ${call} threw ${error.name}: ${error.message}`);
    }
  }

  console.log(`\n${passed} of ${cases.length} passed`);
  process.exitCode = passed === cases.length ? 0 : 1;
}

module.exports = runCases;
