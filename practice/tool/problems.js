// Loads the problem folders and expands generated test inputs.
const fs = require('node:fs');
const path = require('node:path');

const PRACTICE_DIR = path.join(__dirname, '..');

// Every folder named like "007-some-title" that holds a problem.json.
function loadProblems() {
  return fs
    .readdirSync(PRACTICE_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d{3}-/.test(entry.name))
    .map((entry) => entry.name)
    .sort()
    .map((id) => {
      const dir = path.join(PRACTICE_DIR, id);
      const data = JSON.parse(fs.readFileSync(path.join(dir, 'problem.json'), 'utf8'));
      return { id, number: id.slice(0, 3), dir, ...data };
    });
}

// Accepts "7", "007" or the full folder name.
function findProblem(problems, query) {
  const number = /^\d+$/.test(query) ? query.padStart(3, '0') : null;
  return problems.find((problem) => problem.number === number || problem.id === query);
}

// A small deterministic random source, so a large input is identical on
// every run and on every machine.
function randomSource(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let mixed = state;
    mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

// A test argument is a plain JSON value, or one of these generators for
// inputs that are too large to write out in problem.json:
//   { "$range": [start, count, step] }                  an int[]
//   { "$random": { "count", "min", "max", "seed" } }    an int[]
//   { "$repeat": [text, times] }                        a string
//   { "$concat": [a, b, ...] }                          arrays or strings joined
function expand(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return value;
  }
  if ('$range' in value) {
    const [start, count, step] = value.$range;
    return Array.from({ length: count }, (_, index) => start + index * step);
  }
  if ('$random' in value) {
    const { count, min, max, seed } = value.$random;
    const next = randomSource(seed);
    return Array.from({ length: count }, () => min + Math.floor(next() * (max - min + 1)));
  }
  if ('$repeat' in value) {
    const [text, times] = value.$repeat;
    return text.repeat(times);
  }
  if ('$concat' in value) {
    const parts = value.$concat.map(expand);
    return typeof parts[0] === 'string' ? parts.join('') : parts.flat();
  }
  throw new Error(`Unknown test generator: ${JSON.stringify(value)}`);
}

module.exports = { PRACTICE_DIR, loadProblems, findProblem, expand };
