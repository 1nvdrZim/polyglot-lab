# 012 · Longest common prefix

*Easy · aim for 15 minutes*

Given an array of strings `words` with at least one word, return the longest string that every word starts with. Return an empty string if they have no common beginning.

| Input | Output | Why |
| --- | --- | --- |
| `words = ["flower", "flow", "flight"]` | `"fl"` | all three start with `fl` |
| `words = ["dog", "racecar", "car"]` | `""` | the first letters already differ |
| `words = ["alone"]` | `"alone"` | a single word is its own prefix |

**Constraints**

- `1 <= words.length <= 200`
- `0 <= words[i].length <= 200`
- each word contains only lowercase English letters
