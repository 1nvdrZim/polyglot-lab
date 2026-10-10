# 006 · Valid palindrome

*Easy · aim for 15 minutes*

A phrase is a palindrome if it reads the same forwards and backwards once you ignore letter case and skip every character that is not a letter or a digit.

Given `text`, return true if it is a palindrome.

| Input | Output | Why |
| --- | --- | --- |
| `text = "A man, a plan, a canal: Panama"` | `true` | `amanaplanacanalpanama` reads the same both ways |
| `text = "race a car"` | `false` | `raceacar` is different when reversed |
| `text = " "` | `true` | nothing is left after skipping, and an empty string is a palindrome |
| `text = "0P"` | `false` | `0` and `p` differ |

**Constraints**

- `0 <= text.length <= 100000`
- `text` contains printable ASCII characters
