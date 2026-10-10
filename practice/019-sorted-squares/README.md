# 019 · Squares of a sorted array

*Easy · aim for 15 minutes*

`nums` is sorted in non-decreasing order and may contain negative numbers. Return an array of the squares of each number, also sorted in non-decreasing order.

| Input | Output | Why |
| --- | --- | --- |
| `nums = [-4, -1, 0, 3, 10]` | `[0, 1, 9, 16, 100]` | the square of -4 lands between 9 and 100 |
| `nums = [-7, -3, 2, 3, 11]` | `[4, 9, 9, 49, 121]` | equal squares are both kept |
| `nums = [1, 2, 3]` | `[1, 4, 9]` | with no negatives the order does not change |

**Constraints**

- `0 <= nums.length <= 100000`
- `-10000 <= nums[i] <= 10000`
