# 021 · Daily temperatures

*Medium · aim for 30 minutes*

`temperatures[i]` is the temperature on day `i`. For each day, work out how many days you have to wait for a warmer temperature.

If no later day is warmer, the answer for that day is `0`. Return the array of answers.

| Input | Output | Why |
| --- | --- | --- |
| `temperatures = [73, 74, 75, 71, 69, 72, 76, 73]` | `[1, 1, 4, 2, 1, 1, 0, 0]` | day 2 (75) waits four days for 76 |
| `temperatures = [30, 40, 50, 60]` | `[1, 1, 1, 0]` | each day is followed by a warmer one, except the last |
| `temperatures = [30, 20, 10]` | `[0, 0, 0]` | it never gets warmer |

**Constraints**

- `1 <= temperatures.length <= 100000`
- `30 <= temperatures[i] <= 100`
