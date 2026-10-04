// Lesson 03 - a dictionary (hash map) and sorting with LINQ.

string text = "the quick brown fox jumps over the lazy dog the fox";

var counts = new Dictionary<string, int>();
foreach (string word in text.Split(' '))
{
    // GetValueOrDefault returns 0 when the key is missing.
    counts[word] = counts.GetValueOrDefault(word) + 1;
}

// Sort by count descending, then word ascending. Ordinal compares raw
// character codes, so the result does not depend on the machine's locale.
var sorted = counts
    .OrderByDescending(pair => pair.Value)
    .ThenBy(pair => pair.Key, StringComparer.Ordinal);

foreach (var (word, count) in sorted)
{
    Console.WriteLine($"{word}: {count}");
}
