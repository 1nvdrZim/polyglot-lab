# 025 · Coin change

*Medium · aim for 30 minutes*

You have an unlimited supply of coins in each of the denominations listed in `coins`. Return the smallest number of coins needed to make exactly `amount`, or `-1` if it cannot be made.

| Input | Output | Why |
| --- | --- | --- |
| `coins = [1, 2, 5]`, `amount = 11` | `3` | 5 + 5 + 1 |
| `coins = [2]`, `amount = 3` | `-1` | an odd amount cannot be made from 2s |
| `coins = [1]`, `amount = 0` | `0` | no coins are needed for zero |
| `coins = [1, 3, 4]`, `amount = 6` | `2` | 3 + 3; taking the largest coin first gives 4 + 1 + 1, which is worse |

**Constraints**

- `1 <= coins.length <= 12`
- `1 <= coins[i] <= 10000`
- `0 <= amount <= 10000`
