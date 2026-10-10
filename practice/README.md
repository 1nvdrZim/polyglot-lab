# Daily practice

Thirty assessment-style problems, of the kind used in job interviews and online coding tests. Do one a day, in whichever language you choose: JavaScript, Python, Java, C# or C.

## A day's practice

From the repository folder:

```powershell
.\daily              # show today's problem and choose a language
.\daily test         # run the tests against your solution
.\daily hint         # a stronger hint, one step at a time
```

`.\daily` creates a starter file for the language you pick, for example `practice\002-two-sum\java\Solution.java`. Its comments give you the task, one small nudge, and reminders of that language's syntax for the types involved. They do not give the approach away.

When every test passes, the tool records the solve in `progress.json`, shows how long you took, and names the pattern the problem was built around.

Other commands:

```powershell
.\daily java                 # start or continue today's problem in a given language
.\daily pick 5 csharp        # work on a particular problem, for example to redo it in C#
.\daily list                 # every problem, and what you have solved in each language
```

On macOS or Linux, use `node practice/daily.js` in place of `.\daily`.

## How to get good at this

1. **Solve each problem in JavaScript first**, then again in C# and Java on later days with `.\daily pick`. The approach stays the same and only the language changes, which is exactly what you need for an assessment in a language you use less.
2. **Follow the same first five minutes every time** (below), so there is always a next thing to do.
3. **Watch the clock.** Aim for 15 minutes on an easy problem and 30 on a medium one.
4. **Take a hint before you take a break.** The hints are ordered from a gentle question to a near-outline of the solution.

### The first five minutes

Most failed assessments are lost before any code is written.

1. **Restate it.** One sentence: what goes in, what comes out.
2. **Solve one example by hand.** Write down each thing you did, in plain words.
3. **Turn those steps into the plainest approach that works**, even if it is slow.
4. **Find the repeated work.** If you look something up again and again, a map or set can remember it. If order matters, consider sorting first.
5. **Then write code**, and try the smallest awkward inputs: empty, one item, everything the same.

## What the tests tell you

```
pass  twoSum([2, 7, 11, 15], 9) -> [0, 1]
FAIL  twoSum([3, 2, 4], 6)
      returned [0, 0]
      expected [1, 2]
FAIL  large input: 200,000 numbers, the pair is at the very end
      time limit exceeded (2 s): the approach is too slow for this input, or a loop never ends
```

- Anything your code prints (`console.log`, `print`, `System.out.println`, `Console.WriteLine`, `printf`) is shown under the test that printed it, so you can debug the way you would in a real assessment.
- Some problems end with a **large input** and a time limit of 2 seconds per test (6 for Python). A correct but slow approach fails there, the same way hidden tests fail on an assessment site.

## Syntax reminders

Side-by-side tables from JavaScript to each language: [Python](cheatsheets/python.md), [Java](cheatsheets/java.md), [C#](cheatsheets/csharp.md), [C](cheatsheets/c.md).

## Layout

```
practice/
  daily.js                 the tool behind .\daily
  progress.json            what you have solved, and when (created on your first solve)
  cheatsheets/             JavaScript-to-language syntax tables
  tool/                    starter-file and test-runner code for each language
  002-two-sum/
    README.md              the problem statement
    problem.json           function signature, hints and test cases
    java/Solution.java     your solution (created when you choose a language)
```

## Adding a problem

Create a folder named with the next number, containing a `README.md` and a `problem.json` shaped like the existing ones. Parameter and return types can be `int`, `bool`, `string`, `int[]` and `string[]` (returns: all but `string[]`); the tool works out each language's signature from them.
