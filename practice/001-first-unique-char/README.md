# 001 · First unique character

*Easy · aim for 15 minutes*

Given a string `text`, return the **index** of the first character that appears exactly once in it. If every character repeats, return `-1`.

Uppercase and lowercase letters count as different characters.

| Input | Output | Why |
| --- | --- | --- |
| `text = "stress"` | `1` | `t` is the first character that occurs only once |
| `text = "level"` | `2` | `v` is the only character that occurs once |
| `text = "aabb"` | `-1` | every character repeats |
| `text = ""` | `-1` | there is nothing to find |

**Constraints**

- `0 <= text.length <= 100000`
- `text` contains only English letters
