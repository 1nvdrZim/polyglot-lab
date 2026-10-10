# 007 · Best time to buy and sell

*Easy · aim for 15 minutes*

`prices[i]` is the price of a stock on day `i`. You may buy on one day and sell on a later day.

Return the largest profit you can make, or `0` if no profit is possible.

| Input | Output | Why |
| --- | --- | --- |
| `prices = [7, 1, 5, 3, 6, 4]` | `5` | buy at 1, sell at 6 |
| `prices = [7, 6, 4, 3, 1]` | `0` | the price only falls |
| `prices = [2, 4, 1]` | `2` | buy at 2, sell at 4; the lower price 1 comes too late |

**Constraints**

- `1 <= prices.length <= 200000`
- `0 <= prices[i] <= 1000000`
