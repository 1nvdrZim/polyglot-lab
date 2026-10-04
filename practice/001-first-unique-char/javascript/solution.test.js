const runCases = require('../../harness.js');
const firstUniqueChar = require('./solution.js');

// Each case is [arguments, expected result].
runCases(firstUniqueChar, [
  [['stress'], 1],
  [['level'], 2],
  [['aabb'], -1],
  [[''], -1],
  [['z'], 0],
  [['swiss'], 1],
  [['racecar'], 3],
  [['abcabcd'], 6],
  [['aA'], 0],
]);
