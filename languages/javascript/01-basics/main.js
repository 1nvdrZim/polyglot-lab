// Lesson 01 - variables, types, functions, formatting.
// JavaScript is dynamically typed, and it has a single number type: there is
// no separate integer, so 7 / 2 is always 3.5.

function average(values) {
  let sum = 0;
  for (const value of values) {
    sum += value;
  }
  return sum / values.length;
}

const name = 'Polyglot Lab';
console.log(`Hello, ${name}!`);

const readings = [18.5, 21.0, 23.5, 19.0, 24.5];
console.log(`Readings: ${readings.length}`);
console.log(`Average: ${average(readings).toFixed(1)}`);

// Integer division has to be asked for explicitly by truncating the result.
console.log(`7 / 2 = ${Math.trunc(7 / 2)} (integer)`);
console.log(`7 / 2 = ${7 / 2} (floating point)`);
