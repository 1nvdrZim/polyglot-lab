# 009 · Binary search

*Easy · aim for 15 minutes*

`nums` is sorted in increasing order and contains no duplicates. Return the index of `target`, or `-1` if it is not present.

Your solution should not need to look at every element.

| Input | Output | Why |
| --- | --- | --- |
| `nums = [-1, 0, 3, 5, 9, 12]`, `target = 9` | `4` | 9 is at index 4 |
| `nums = [-1, 0, 3, 5, 9, 12]`, `target = 2` | `-1` | 2 is not in the array |
| `nums = [5]`, `target = 5` | `0` | a single element can be the target |

**Constraints**

- `1 <= nums.length <= 100000`
- `nums` is sorted in increasing order with no duplicates
