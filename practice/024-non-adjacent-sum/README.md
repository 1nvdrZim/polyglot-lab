# 024 · Largest sum without neighbours

*Medium · aim for 30 minutes*

Given an array `values` of non-negative integers, choose any of its elements so that no two chosen elements are next to each other in the array. Return the largest total you can reach.

| Input | Output | Why |
| --- | --- | --- |
| `values = [1, 2, 3, 1]` | `4` | take 1 and 3 |
| `values = [2, 7, 9, 3, 1]` | `12` | take 2, 9 and 1 |
| `values = [5]` | `5` | a single element |
| `values = [2, 1, 1, 2]` | `4` | take the two 2s; skipping two elements in a row is allowed |

**Constraints**

- `1 <= values.length <= 100000`
- `0 <= values[i] <= 10000`
