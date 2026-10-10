# 003 · Valid anagram

*Easy · aim for 15 minutes*

Two strings are anagrams when one can be rearranged to form the other, using every character exactly once.

Given `first` and `second`, return true if they are anagrams and false otherwise. The comparison is case-sensitive.

| Input | Output | Why |
| --- | --- | --- |
| `first = "listen"`, `second = "silent"` | `true` | the same letters in a different order |
| `first = "rat"`, `second = "car"` | `false` | `t` and `c` differ |
| `first = "aab"`, `second = "abb"` | `false` | the same letters, but different counts |
| `first = ""`, `second = ""` | `true` | two empty strings match |

**Constraints**

- `0 <= first.length, second.length <= 100000`
- both strings contain only English letters
