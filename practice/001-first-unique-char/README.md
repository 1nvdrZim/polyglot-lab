# 001 · First unique character

Given a string `text`, return the **index** of the first character that appears exactly once in it. If every character repeats, return `-1`.

Uppercase and lowercase letters count as different characters.

| Input | Output | Why |
| --- | --- | --- |
| `"stress"` | `1` | `t` is the first character that occurs only once |
| `"level"` | `2` | `v` is the only character that occurs once |
| `"aabb"` | `-1` | every character repeats |
| `""` | `-1` | there is nothing to find |

**Constraints:** `0 <= text.length <= 100000`
