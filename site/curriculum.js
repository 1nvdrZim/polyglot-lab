// All the site's content lives here as plain data. app.js only renders it.
// To add a lesson: add a folder under languages/<lang>/ for each language,
// then add an entry to `lessons` whose id matches the folder name.

window.CURRICULUM = {
  languages: [
    { id: 'python', name: 'Python', file: 'main.py', hl: 'python' },
    { id: 'java', name: 'Java', file: 'Main.java', hl: 'java' },
    { id: 'csharp', name: 'C#', file: 'Program.cs', hl: 'csharp' },
    { id: 'c', name: 'C', file: 'main.c', hl: 'c' },
    { id: 'cpp', name: 'C++', file: 'main.cpp', hl: 'cpp' },
  ],

  lessons: [
    {
      id: '01-basics',
      title: 'Variables, types and functions',
      summary:
        'One small program: greet, average five numbers, and show the difference between integer and floating-point division.',
      concepts: [
        'Static typing (Java, C#, C, C++) fixes a variable\'s type at compile time; dynamic typing (Python) checks at run time.',
        'Compiled to native code (C, C++), compiled to bytecode for a virtual machine (Java, C#), or interpreted (Python).',
        'Dividing two integers truncates in every language here except Python, which has a separate // operator for it.',
      ],
      notice: {
        python: 'No declarations and no main function. The type hints are documentation only.',
        java: 'Everything sits inside a class, and main has a fixed signature. Arrays know their length.',
        csharp: 'Top-level statements remove the class and Main boilerplate. $"..." is string interpolation.',
        c: 'The array\'s length must be passed alongside it: inside average() it is only a pointer.',
        cpp: 'std::vector carries its own size, and const& passes it without a copy.',
      },
      challenge:
        'Add a function that returns the highest reading and print it as "Max: 24.5". Do it in the language you know first, then port it to two others.',
    },
    {
      id: '02-control-flow',
      title: 'Loops and conditionals',
      summary: 'FizzBuzz from 1 to 15, then every prime below 30 on a single line.',
      concepts: [
        'for loops with a counter are nearly identical across the C family; Python iterates over a range instead.',
        'Printing without a trailing newline differs in every language, and is worth memorising.',
        'A function that answers yes/no returns a boolean. C only gained a real bool type through stdbool.h.',
      ],
      notice: {
        python: 'Indentation is the block structure. range(1, 16) excludes 16.',
        java: 'print versus println. Single-statement ifs may drop the braces.',
        csharp: 'FizzBuzz is written as a switch expression over a tuple, a pattern-matching feature the others lack.',
        c: 'Returning a string would raise the question of who frees it, so the function prints instead.',
        cpp: 'Returning std::string by value is safe because the string owns and frees its own memory.',
      },
      challenge:
        'Change the prime search to stop after finding the first 10 primes rather than at a fixed limit. Which loop construct fits best in each language?',
    },
    {
      id: '03-collections',
      title: 'Maps and sorting',
      summary: 'Count how often each word appears in a sentence, then print the counts sorted by frequency and then alphabetically.',
      concepts: [
        'A hash map (dictionary) gives average constant-time lookup by key. C has none in its standard library.',
        'Sorting by two keys, one descending and one ascending, is expressed differently in every language.',
        'A stable sort keeps equal elements in their original order, which the C++ version exploits.',
      ],
      notice: {
        python: 'Counter does the counting; a tuple key with a negated count handles the mixed sort order.',
        java: 'Map<String, Integer> must use the boxed Integer type. merge() is insert-or-update in one call.',
        csharp: 'LINQ reads like a query: OrderByDescending(...).ThenBy(...).',
        c: 'A fixed array of structs with linear search, and qsort with a comparison function taking void pointers.',
        cpp: 'std::map is a sorted tree, so a stable sort by count leaves ties in alphabetical order for free.',
      },
      challenge:
        'Make the count case-insensitive and ignore punctuation, so "The fox." and "the fox" count the same words.',
    },
    {
      id: '04-types',
      title: 'Defining your own types',
      summary: 'A tiny to-do list: a Task type, a TaskList that owns the tasks, and operations to add and complete them.',
      concepts: [
        'A class bundles data with the functions that operate on it; C has only the data half (struct).',
        'Encapsulation: hide the fields and expose a small set of operations so invalid states are harder to create.',
        'Who owns the memory? Java, C# and Python have a garbage collector. C++ containers free themselves. C leaves it to you.',
      ],
      notice: {
        python: '@dataclass generates the constructor. Mutable defaults need default_factory.',
        java: 'Private fields with accessor methods. final means the field cannot be reassigned.',
        csharp: 'Properties replace getters; { get; private set; } makes a value readable everywhere but writable only inside the class.',
        c: 'Methods become free functions taking a pointer to the struct. {0} zero-initialises it.',
        cpp: 'struct and class differ only in default visibility. A trailing const marks a method as read-only.',
      },
      challenge:
        'Add a remove(id) operation. In C you will have to shift the remaining array elements down yourself.',
    },
  ],

  // A guided path through git, practised on this repository.
  gitTrack: [
    {
      id: 'look',
      title: 'Read the history',
      why: 'Before changing anything, learn to see what state a repository is in. These commands are read-only and always safe.',
      commands: [
        ['git status', 'What is changed, staged, or untracked right now'],
        ['git log --oneline --graph', 'The commit history, one line each'],
        ['git show HEAD', 'The most recent commit: message and full diff'],
      ],
    },
    {
      id: 'commit',
      title: 'Make a commit',
      why: 'A commit is a snapshot plus a message. Staging (git add) lets you choose exactly which changes go into it. Do a lesson challenge, then commit it.',
      commands: [
        ['git diff', 'Unstaged changes, line by line'],
        ['git add languages/python/01-basics/main.py', 'Stage one file'],
        ['git diff --staged', 'What the next commit will contain'],
        ['git commit -m "Add max reading to Python basics"', 'Record the snapshot'],
      ],
    },
    {
      id: 'branch',
      title: 'Work on a branch',
      why: 'A branch is a movable label on a commit. Branching lets you experiment without touching main.',
      commands: [
        ['git switch -c lesson-05', 'Create a branch and switch to it'],
        ['git branch', 'List branches; * marks the current one'],
        ['git switch main', 'Go back to main'],
      ],
    },
    {
      id: 'merge',
      title: 'Merge it back',
      why: 'Merging brings a branch\'s commits into another. If main has not moved, git just slides the label forward (a fast-forward).',
      commands: [
        ['git switch main', 'Be on the branch you want to merge into'],
        ['git merge lesson-05', 'Bring the branch\'s commits in'],
        ['git branch -d lesson-05', 'Delete the merged branch label'],
      ],
    },
    {
      id: 'undo',
      title: 'Undo things safely',
      why: 'Most git fear comes from not knowing how to back out. These cover nearly every everyday case.',
      commands: [
        ['git restore main.py', 'Discard unstaged edits to a file (cannot be recovered)'],
        ['git restore --staged main.py', 'Unstage a file but keep the edits'],
        ['git commit --amend', 'Fix the last commit, only if it is not pushed yet'],
        ['git revert <commit>', 'Add a new commit that undoes an old one; safe after pushing'],
      ],
    },
    {
      id: 'conflict',
      title: 'Cause a conflict on purpose',
      why: 'Edit the same line on two branches, then merge. Git marks the clash with <<<<<<< and >>>>>>>. Resolving one deliberately removes the mystery.',
      commands: [
        ['git merge other-branch', 'Reports CONFLICT and pauses'],
        ['git status', 'Lists the files that need resolving'],
        ['git add <file>', 'After editing out the markers, mark it resolved'],
        ['git commit', 'Finish the merge'],
        ['git merge --abort', 'Or give up and return to before the merge'],
      ],
    },
    {
      id: 'remote',
      title: 'Publish to GitHub',
      why: 'A remote is another copy of the repository. Create an empty repository on github.com (no README), then connect and push.',
      commands: [
        ['git remote add origin https://github.com/<you>/polyglot-lab.git', 'Name the GitHub copy "origin"'],
        ['git push -u origin main', 'Upload main and remember where it goes'],
        ['git pull', 'Later: fetch and merge changes from GitHub'],
      ],
    },
    {
      id: 'pages',
      title: 'Put the site online',
      why: 'GitHub Pages serves a repository as a website for free. On GitHub: Settings, Pages, Source "Deploy from a branch", branch main, folder / (root). The site appears at <you>.github.io/polyglot-lab.',
      commands: [
        ['git push', 'Every push to main redeploys the site'],
      ],
    },
    {
      id: 'tidy',
      title: 'Stash and rebase',
      why: 'Two tools for keeping work tidy: stash shelves unfinished changes; rebase replays your branch on top of the latest main for a straight-line history.',
      commands: [
        ['git stash', 'Shelve uncommitted changes'],
        ['git stash pop', 'Bring them back'],
        ['git rebase main', 'Replay the current branch on top of main'],
        ['git reflog', 'A log of everywhere HEAD has been; the safety net for mistakes'],
      ],
    },
  ],

  gitCheats: [
    ['Setup', 'git init', 'Turn the current folder into a repository'],
    ['Setup', 'git clone <url>', 'Copy a remote repository to your machine'],
    ['Setup', 'git config --global user.name "Name"', 'Set the name recorded on your commits'],
    ['Inspect', 'git status', 'Changed, staged and untracked files'],
    ['Inspect', 'git diff', 'Unstaged changes'],
    ['Inspect', 'git diff --staged', 'Staged changes'],
    ['Inspect', 'git log --oneline --graph --all', 'History of every branch as a graph'],
    ['Inspect', 'git show <commit>', 'One commit\'s message and diff'],
    ['Inspect', 'git blame <file>', 'Who last changed each line'],
    ['Save', 'git add <file>', 'Stage a file'],
    ['Save', 'git add -p', 'Stage changes piece by piece'],
    ['Save', 'git commit -m "message"', 'Commit what is staged'],
    ['Save', 'git commit --amend', 'Rewrite the last commit (unpushed only)'],
    ['Branch', 'git branch', 'List branches'],
    ['Branch', 'git switch <branch>', 'Switch to a branch'],
    ['Branch', 'git switch -c <branch>', 'Create a branch and switch to it'],
    ['Branch', 'git merge <branch>', 'Merge a branch into the current one'],
    ['Branch', 'git rebase <branch>', 'Replay the current branch on top of another'],
    ['Branch', 'git branch -d <branch>', 'Delete a merged branch'],
    ['Undo', 'git restore <file>', 'Discard unstaged edits'],
    ['Undo', 'git restore --staged <file>', 'Unstage, keeping the edits'],
    ['Undo', 'git revert <commit>', 'New commit that undoes an old one'],
    ['Undo', 'git reset --soft HEAD~1', 'Undo the last commit, keep changes staged'],
    ['Undo', 'git stash', 'Shelve uncommitted changes'],
    ['Undo', 'git stash pop', 'Restore shelved changes'],
    ['Undo', 'git reflog', 'Everywhere HEAD has pointed; recover lost commits'],
    ['Remote', 'git remote -v', 'List remotes and their URLs'],
    ['Remote', 'git remote add origin <url>', 'Connect to a remote repository'],
    ['Remote', 'git push -u origin main', 'First push of a branch'],
    ['Remote', 'git push', 'Upload new commits'],
    ['Remote', 'git fetch', 'Download remote commits without merging'],
    ['Remote', 'git pull', 'Fetch, then merge'],
  ],

  // A ladder of portfolio projects, smallest first.
  projects: [
    {
      title: 'Lesson 05: files and errors',
      langs: 'All five',
      body: 'Read a text file and report line, word and character counts. Handle the missing-file case: exceptions in Java, C# and Python, return codes in C, and either in C++. Add it to this site as a new lesson.',
    },
    {
      title: 'Command-line to-do app',
      langs: 'Python, then C#',
      body: 'Grow lesson 04 into a real tool: add, list, done and remove sub-commands, with tasks saved to a JSON file between runs.',
    },
    {
      title: 'Text adventure engine',
      langs: 'Java',
      body: 'Rooms, items and commands loaded from a data file. Good practice for classes, interfaces and collections.',
    },
    {
      title: 'Image filter tool',
      langs: 'C or C++',
      body: 'Read a PPM image, apply greyscale, blur or invert, and write it back. Teaches memory, pointers and binary file handling.',
    },
    {
      title: 'REST API for the to-do app',
      langs: 'C# (ASP.NET Core)',
      body: 'Expose the to-do list over HTTP and give it a small web front end. The first full-stack piece for your portfolio.',
    },
  ],
};
