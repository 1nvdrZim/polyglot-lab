# 028 · Evaluate reverse Polish notation

*Medium · aim for 30 minutes*

Evaluate an arithmetic expression written in reverse Polish notation, where each operator comes after its two operands.

`tokens` holds the expression as strings: each token is an integer or one of `+`, `-`, `*`, `/`. Division between two integers truncates toward zero. The expression is always valid. Return its value.

| Input | Output | Why |
| --- | --- | --- |
| `tokens = ["2", "1", "+", "3", "*"]` | `9` | (2 + 1) * 3 |
| `tokens = ["4", "13", "5", "/", "+"]` | `6` | 4 + (13 / 5), and 13 / 5 truncates to 2 |
| `tokens = ["7", "-3", "/"]` | `-2` | 7 / -3 is about -2.33, which truncates toward zero |
| `tokens = ["42"]` | `42` | a single number is already the answer |

**Constraints**

- `1 <= tokens.length <= 10000`
- every intermediate result fits in a 32-bit integer
- there is no division by zero
