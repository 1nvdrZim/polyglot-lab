# 013 · Roman to integer

*Easy · aim for 15 minutes*

Roman numerals use the symbols `I` = 1, `V` = 5, `X` = 10, `L` = 50, `C` = 100, `D` = 500 and `M` = 1000.

Symbols are normally written from largest to smallest and added together. When a smaller symbol comes directly before a larger one, it is subtracted instead: `IV` is 4 and `CM` is 900.

Given a valid Roman numeral, return its value.

| Input | Output | Why |
| --- | --- | --- |
| `roman = "III"` | `3` | 1 + 1 + 1 |
| `roman = "LVIII"` | `58` | 50 + 5 + 3 |
| `roman = "MCMXCIV"` | `1994` | 1000 + 900 + 90 + 4 |
| `roman = "IX"` | `9` | 10 - 1 |

**Constraints**

- `1 <= roman.length <= 15`
- `roman` is a valid numeral between 1 and 3999
