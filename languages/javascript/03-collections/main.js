// Lesson 03 - a Map (hash map) and sorting with a comparator.

const text = 'the quick brown fox jumps over the lazy dog the fox';

const counts = new Map();
for (const word of text.split(' ')) {
  // ?? supplies 0 when the word has not been seen yet.
  counts.set(word, (counts.get(word) ?? 0) + 1);
}

// Sort by count descending, then word ascending. A comparator returns a
// negative number when a sorts first, positive when b does. Map keys are
// unique, so the two words are never equal.
const sorted = [...counts].sort(([wordA, countA], [wordB, countB]) => {
  if (countA !== countB) return countB - countA;
  return wordA < wordB ? -1 : 1;
});

for (const [word, count] of sorted) {
  console.log(`${word}: ${count}`);
}
