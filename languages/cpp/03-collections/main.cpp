// Lesson 03 - a map and sorting with the ranges library.

#include <algorithm>
#include <functional>
#include <map>
#include <print>
#include <sstream>
#include <string>
#include <utility>
#include <vector>

int main() {
    std::string text = "the quick brown fox jumps over the lazy dog the fox";

    // std::map is a sorted tree, so iterating it yields words alphabetically.
    // (std::unordered_map is the hash map.) operator[] inserts 0 if missing.
    std::map<std::string, int> counts;
    std::istringstream words(text);
    for (std::string word; words >> word;) {
        counts[word]++;
    }

    using Entry = std::pair<std::string, int>;
    std::vector<Entry> sorted(counts.begin(), counts.end());

    // Sort by count descending. A *stable* sort keeps equal counts in their
    // existing (alphabetical) order, which gives the tie-break for free.
    std::ranges::stable_sort(sorted, std::greater{}, &Entry::second);

    for (const auto& [word, count] : sorted) {
        std::println("{}: {}", word, count);
    }
}
