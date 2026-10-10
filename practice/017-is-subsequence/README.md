# 017 · Is subsequence

*Easy · aim for 15 minutes*

`part` is a subsequence of `whole` if you can delete zero or more characters from `whole`, without reordering the rest, and be left with `part`.

Return true if `part` is a subsequence of `whole`.

| Input | Output | Why |
| --- | --- | --- |
| `part = "abc"`, `whole = "ahbgdc"` | `true` | `a`, `b` and `c` appear in that order |
| `part = "axc"`, `whole = "ahbgdc"` | `false` | there is no `x` |
| `part = ""`, `whole = "anything"` | `true` | the empty string is a subsequence of everything |
| `part = "acb"`, `whole = "abc"` | `false` | the letters are there, but in the wrong order |

**Constraints**

- `0 <= part.length, whole.length <= 100000`
- both strings contain only lowercase English letters
