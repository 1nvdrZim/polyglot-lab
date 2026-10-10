# 022 · Subarray sum equals target

*Medium · aim for 30 minutes*

Given an array of integers `nums` and an integer `target`, return the number of contiguous, non-empty runs of elements whose sum equals `target`.

| Input | Output | Why |
| --- | --- | --- |
| `nums = [1, 1, 1]`, `target = 2` | `2` | the first two elements, and the last two |
| `nums = [1, 2, 3]`, `target = 3` | `2` | `[1, 2]` and `[3]` |
| `nums = [1, -1, 0]`, `target = 0` | `3` | `[1, -1]`, `[0]` and `[1, -1, 0]` |

**Constraints**

- `1 <= nums.length <= 200000`
- `-1000 <= nums[i] <= 1000`
- `-10000000 <= target <= 10000000`
