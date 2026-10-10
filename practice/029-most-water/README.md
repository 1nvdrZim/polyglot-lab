# 029 · Container with most water

*Medium · aim for 30 minutes*

`heights[i]` is the height of a vertical line drawn at position `i`. Choose two lines; together with the ground they form a container that holds water up to the height of the shorter line.

Return the largest amount of water a container can hold: the distance between the two lines multiplied by the shorter height.

| Input | Output | Why |
| --- | --- | --- |
| `heights = [1, 8, 6, 2, 5, 4, 8, 3, 7]` | `49` | the lines at positions 1 and 8: distance 7, shorter height 7 |
| `heights = [1, 1]` | `1` | distance 1, height 1 |
| `heights = [4, 3, 2, 1, 4]` | `16` | the two outer lines: distance 4, height 4 |

**Constraints**

- `2 <= heights.length <= 200000`
- `0 <= heights[i] <= 10000`
