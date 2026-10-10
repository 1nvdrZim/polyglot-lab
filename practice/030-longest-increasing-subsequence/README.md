# 030 · Longest increasing subsequence

*Medium · aim for 30 minutes*

Given an array `nums`, return the length of its longest strictly increasing subsequence. A subsequence keeps elements in their original order but may skip any of them.

| Input | Output | Why |
| --- | --- | --- |
| `nums = [10, 9, 2, 5, 3, 7, 101, 18]` | `4` | for example 2, 3, 7, 18 |
| `nums = [0, 1, 0, 3, 2, 3]` | `4` | 0, 1, 2, 3 |
| `nums = [7, 7, 7, 7]` | `1` | equal values are not increasing |
| `nums = [5]` | `1` | a single element |

**Constraints**

- `1 <= nums.length <= 2500`
- `-10000 <= nums[i] <= 10000`
