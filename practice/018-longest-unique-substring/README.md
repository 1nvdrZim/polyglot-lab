# 018 · Longest substring without repeats

*Medium · aim for 30 minutes*

Given a string `text`, return the length of the longest substring (a run of consecutive characters) in which no character appears more than once.

| Input | Output | Why |
| --- | --- | --- |
| `text = "abcabcbb"` | `3` | `abc` |
| `text = "bbbbb"` | `1` | `b` |
| `text = "pwwkew"` | `3` | `wke`; note that `pwke` does not count because its characters are not consecutive |
| `text = ""` | `0` | there are no characters |

**Constraints**

- `0 <= text.length <= 100000`
- `text` contains only English letters and digits
