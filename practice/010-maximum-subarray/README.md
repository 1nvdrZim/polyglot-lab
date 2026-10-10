# 010 · Maximum subarray

*Medium · aim for 30 minutes*

Given an array of integers `nums` with at least one element, find the contiguous run of elements with the largest sum and return that sum.

| Input | Output | Why |
| --- | --- | --- |
| `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]` | `6` | the run `[4, -1, 2, 1]` |
| `nums = [1]` | `1` | a single element |
| `nums = [5, 4, -1, 7, 8]` | `23` | the whole array |
| `nums = [-3, -1, -2]` | `-1` | with only negative numbers, the best run is the single largest element |

**Constraints**

- `1 <= nums.length <= 200000`
- `-10000 <= nums[i] <= 10000`
