# Polyglot Lab

A learning repository: the same small programs written in **JavaScript, Python, Java, C#, C and C++**, a web app for reading them side by side, a **daily coding-assessment problem** in the language of your choice, and a guided path through **git** that uses this repository as the practice ground.

## Daily practice

Thirty interview-style problems with tests, hints and time targets, solvable in JavaScript, Python, Java, C# or C:

```powershell
.\daily              # show today's problem and choose a language
.\daily test         # run the tests against your solution
.\daily hint         # a stronger hint, one step at a time
```

Details are in [practice/README.md](practice/README.md).

## Layout

```
index.html            the web app (static: no build step)
site/                 its CSS, JavaScript and lesson content (curriculum.js)
languages/
  javascript/  python/  java/  csharp/  c/  cpp/
    01-basics/            variables, types, functions
    02-control-flow/      loops and conditionals
    03-collections/       maps and sorting
    04-types/             classes and structs
practice/             the daily problems, their tests, and your solutions
daily.cmd             shortcut for the daily practice tool
scripts/
  run.ps1             run one lesson in one language
  check.ps1           run everything and confirm all languages agree
  serve.ps1           serve the web app locally
```

Every lesson prints **exactly the same output** in all six languages. That is the point: the behaviour is fixed, so the only thing that changes is how each language expresses it.

## Running the lessons

Windows blocks PowerShell scripts by default (`.\daily` is not affected). Allow locally written scripts once:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Then, from the repository root:

```powershell
.\scripts\run.ps1 java 01        # run lesson 01 in Java
.\scripts\run.ps1 cpp 03         # compile and run lesson 03 in C++
.\scripts\check.ps1              # run all 24 programs and compare their output
.\scripts\serve.ps1              # then open http://localhost:8000
```

## Toolchain

| Language | Tool | Run a single file |
| --- | --- | --- |
| JavaScript | Node.js 24 | `node main.js` |
| Python | Python 3.13 | `py main.py` |
| Java | JDK 27 | `java Main.java` |
| C# | .NET 10 SDK | `dotnet run Program.cs` |
| C | GCC (MSYS2 UCRT64) | `gcc -std=c17 main.c -o main.exe` |
| C++ | G++ (MSYS2 UCRT64) | `g++ -std=c++23 main.cpp -o main.exe -lstdc++exp` |

## How to work through it

1. Open the web app and read a lesson with two languages side by side.
2. Run both versions with `run.ps1`.
3. Do the lesson's "Your turn" challenge, in the language you know first, then in the others.
4. Run `check.ps1` to confirm they still agree.
5. Commit it. The **Git** tab walks through status, commit, branch, merge, undo, conflicts and pushing to GitHub in order.

## Adding a lesson

1. Create `languages/<lang>/05-your-topic/` in each language with the same file names the other lessons use.
2. Add an entry to `lessons` in `site/curriculum.js` with `id: '05-your-topic'`.
3. Run `.\scripts\check.ps1`.
