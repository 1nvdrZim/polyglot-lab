# 020 · Product of array except self

*Medium · aim for 30 minutes*

Given an array `nums`, return an array `result` where `result[i]` is the product of every element of `nums` except `nums[i]`.

Solve it without using division.

| Input | Output | Why |
| --- | --- | --- |
| `nums = [1, 2, 3, 4]` | `[24, 12, 8, 6]` | for index 0: 2 * 3 * 4 = 24 |
| `nums = [-1, 1, 0, -3, 3]` | `[0, 0, 9, 0, 0]` | only the position of the zero gets a non-zero product |
| `nums = [2, 3]` | `[3, 2]` | each element gets the other one |

**Constraints**

- `2 <= nums.length <= 100000`
- `-30 <= nums[i] <= 30`
- every product fits in a 32-bit integer
