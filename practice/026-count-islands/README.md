# 026 · Number of islands

*Medium · aim for 30 minutes*

`grid` is a map made of rows of equal length, where each character is `1` (land) or `0` (water).

An island is a group of land cells connected horizontally or vertically, not diagonally. Return the number of islands.

| Input | Output | Why |
| --- | --- | --- |
| `grid = ["11000", "11000", "00100", "00011"]` | `3` | a 2 x 2 block, a single cell, and a pair |
| `grid = ["111", "101", "111"]` | `1` | a ring is one island |
| `grid = ["000", "000"]` | `0` | there is no land |
| `grid = ["101", "010", "101"]` | `5` | diagonal neighbours do not connect |

**Constraints**

- `1 <= grid.length <= 50`
- `1 <= grid[i].length <= 50`
- every row has the same length
