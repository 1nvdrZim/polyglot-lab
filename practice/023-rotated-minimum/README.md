# 023 · Minimum in a rotated sorted array

*Medium · aim for 30 minutes*

An array of distinct integers was sorted in increasing order and then rotated: some number of elements were moved from the front to the back, keeping their order. For example, `[1, 2, 3, 4, 5]` may become `[3, 4, 5, 1, 2]`.

Given the rotated array `nums`, return its smallest element. Aim to do it without checking every element.

| Input | Output | Why |
| --- | --- | --- |
| `nums = [3, 4, 5, 1, 2]` | `1` | the array was rotated by three positions |
| `nums = [4, 5, 6, 7, 0, 1, 2]` | `0` | the drop from 7 to 0 marks the minimum |
| `nums = [11, 13, 15, 17]` | `11` | rotating by zero positions is allowed |
| `nums = [2, 1]` | `1` | the smallest case that is actually rotated |

**Constraints**

- `1 <= nums.length <= 100000`
- all values are distinct
