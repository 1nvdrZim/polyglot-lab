# 015 · Missing number

*Easy · aim for 15 minutes*

`nums` contains n distinct integers taken from the range 0 to n inclusive, so exactly one number in that range is missing. Return the missing number.

| Input | Output | Why |
| --- | --- | --- |
| `nums = [3, 0, 1]` | `2` | n is 3, and 2 is absent |
| `nums = [0, 1]` | `2` | n is 2, and 2 itself is the one missing |
| `nums = [9, 6, 4, 2, 3, 5, 7, 0, 1]` | `8` | every number from 0 to 9 except 8 is present |
| `nums = [1]` | `0` | n is 1, and 0 is absent |

**Constraints**

- `1 <= nums.length <= 10000`
- all values are distinct and between 0 and `nums.length`
