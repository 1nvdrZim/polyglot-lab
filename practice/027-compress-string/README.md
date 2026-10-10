# 027 · String compression

*Easy · aim for 15 minutes*

Compress a string by replacing each run of the same character with that character followed by the length of the run.

A run of length 1 is written as just the character, with no number. Return the compressed string.

| Input | Output | Why |
| --- | --- | --- |
| `text = "aaabbc"` | `"a3b2c"` | three `a`, two `b`, one `c` |
| `text = "abc"` | `"abc"` | no run is longer than 1 |
| `text = "aaaaaaaaaaaa"` | `"a12"` | a run length can have more than one digit |
| `text = ""` | `""` | there is nothing to compress |

**Constraints**

- `0 <= text.length <= 100000`
- `text` contains only English letters
