# 008 · Merge two sorted arrays

*Easy · aim for 15 minutes*

Given two arrays that are each sorted in non-decreasing order, return a new array containing all the elements of both, also sorted in non-decreasing order.

| Input | Output | Why |
| --- | --- | --- |
| `first = [1, 3, 5]`, `second = [2, 4, 6]` | `[1, 2, 3, 4, 5, 6]` | the two arrays interleave |
| `first = [1, 2, 2]`, `second = [2, 3]` | `[1, 2, 2, 2, 3]` | duplicates are kept |
| `first = []`, `second = [4, 5]` | `[4, 5]` | one array may be empty |

**Constraints**

- `0 <= first.length, second.length <= 100000`
- `-1000000000 <= value <= 1000000000`
