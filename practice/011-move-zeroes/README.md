# 011 · Move zeroes

*Easy · aim for 15 minutes*

Given an array `nums`, return an array of the same length in which every `0` has been moved to the end, while the other elements keep their original relative order.

| Input | Output | Why |
| --- | --- | --- |
| `nums = [0, 1, 0, 3, 12]` | `[1, 3, 12, 0, 0]` | the non-zero values keep their order |
| `nums = [0]` | `[0]` | a lone zero stays where it is |
| `nums = [4, 2, 4]` | `[4, 2, 4]` | there is nothing to move |

**Constraints**

- `0 <= nums.length <= 100000`
- `-1000000000 <= nums[i] <= 1000000000`
