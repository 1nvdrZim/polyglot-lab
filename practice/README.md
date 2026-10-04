# Practice

Assessment-style problems. Each one has a statement, a stub to fill in, and tests that decide whether it passes, the same way an online assessment does.

```
practice/
  harness.js                runs a solution against its test cases
  001-first-unique-char/
    README.md               the problem statement
    javascript/
      solution.js           write your answer here
      solution.test.js      the tests
```

Solve each problem in JavaScript first. Once it passes, port it to C# and Java in sibling folders: the approach stays the same and only the language changes.

```powershell
.\scripts\practice.ps1 001
```

## The first five minutes

Most failed assessments are lost before any code is written. Follow the same steps every time, so there is always a next thing to do:

1. **Restate it.** One sentence: what goes in, what comes out.
2. **Solve one example by hand.** Write down each thing you did, in plain words.
3. **Turn those steps into the plainest approach that works**, even if it is slow.
4. **Find the repeated work.** If you look something up again and again, a `Map` or `Set` can remember it. If order matters, consider sorting first.
5. **Then write code**, and try the smallest awkward inputs: empty, one item, everything the same.
