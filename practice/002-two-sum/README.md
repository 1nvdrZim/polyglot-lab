# 002 · Two sum

*Easy · aim for 15 minutes*

Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`.

Exactly one such pair exists, and you may not use the same element twice. Return the two indices in increasing order.

| Input | Output | Why |
| --- | --- | --- |
| `nums = [2, 7, 11, 15]`, `target = 9` | `[0, 1]` | 2 + 7 = 9 |
| `nums = [3, 2, 4]`, `target = 6` | `[1, 2]` | 2 + 4 = 6; the 3 cannot be used twice |
| `nums = [3, 3]`, `target = 6` | `[0, 1]` | equal values at different indices are allowed |

**Constraints**

- `2 <= nums.length <= 200000`
- `-1000000000 <= nums[i], target <= 1000000000`
