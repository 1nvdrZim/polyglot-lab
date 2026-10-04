# Lesson 03 - a dictionary (hash map) and sorting with a custom key.
# Counter is a dict subclass built for exactly this job.

from collections import Counter

text = "the quick brown fox jumps over the lazy dog the fox"

counts = Counter(text.split())

# Sort by count descending, then word ascending. Negating the count is the
# usual trick for mixing a descending and an ascending key in one tuple.
for word, count in sorted(counts.items(), key=lambda item: (-item[1], item[0])):
    print(f"{word}: {count}")
