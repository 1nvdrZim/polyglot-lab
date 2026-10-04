// Lesson 02 - loops, conditionals, functions that return booleans.

function fizzbuzz(n) {
  if (n % 15 === 0) return 'FizzBuzz';
  if (n % 3 === 0) return 'Fizz';
  if (n % 5 === 0) return 'Buzz';
  return String(n);
}

function isPrime(n) {
  if (n < 2) return false;
  for (let divisor = 2; divisor * divisor <= n; divisor++) {
    if (n % divisor === 0) return false;
  }
  return true;
}

for (let i = 1; i <= 15; i++) {
  console.log(fizzbuzz(i));
}

// console.log always ends the line, so build the whole line first.
let line = 'Primes below 30:';
for (let n = 2; n < 30; n++) {
  if (isPrime(n)) {
    line += ` ${n}`;
  }
}
console.log(line);
