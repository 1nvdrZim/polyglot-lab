// Everything that differs between languages: what the starter file looks
// like, and how a solution is compiled and run against the tests.
//
// Problem types are int, bool, string, int[] and string[]. Each language maps
// them to its own types and naming style.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const RUNNERS_DIR = path.join(__dirname, 'runners');
const WIDTH = 74;

const snake = (name) => name.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
const pascal = (name) => name[0].toUpperCase() + name.slice(1);
const unchanged = (name) => name;

function wrap(text, indent = '') {
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    if (line && line.length + word.length + 1 > WIDTH) {
      lines.push(line);
      line = indent + word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', windowsHide: true });
  if (result.error) {
    return { ok: false, output: `Could not run "${command}". Is it installed and on your PATH?` };
  }
  return { ok: result.status === 0, output: `${result.stdout}${result.stderr}`.trim() };
}

// Compiler messages show full paths; trim them down to the file you edit.
function shorten(text, solutionPath) {
  const dir = path.dirname(solutionPath);
  return text
    .split(dir + path.sep).join('')
    .split(`${dir.replaceAll('\\', '/')}/`).join('');
}

// Fills the /*MARKER*/ places in one of the runner templates.
function template(name, replacements) {
  let source = fs.readFileSync(path.join(RUNNERS_DIR, name), 'utf8');
  for (const [marker, text] of Object.entries(replacements)) {
    source = source.replace(`/*${marker}*/`, () => text);
  }
  return source;
}

// The per-type reminders shown in a starter file, one per type used.
function reminders(language, problem) {
  const notes = [];
  const covered = new Set();
  for (const [name, type] of problem.params) {
    const note = language.paramNotes[type];
    if (note && !covered.has(type)) {
      covered.add(type);
      notes.push(note(language.paramName(name)));
    }
  }
  notes.push(language.returnNotes[problem.returns]);
  return [
    `${language.name} reminders for this problem:`,
    ...notes.flatMap((note) => wrap(`- ${note}`, '  ')),
    `More syntax: practice/cheatsheets/${language.id}.md`,
  ];
}

const javascript = {
  id: 'javascript',
  name: 'JavaScript',
  aliases: ['js', 'node'],
  file: 'solution.js',
  comment: '//',
  functionName: (problem) => problem.function,
  notes(problem) {
    const types = { int: 'number', bool: 'boolean', string: 'string', 'int[]': 'number[]', 'string[]': 'string[]' };
    const params = problem.params.map(([name, type]) => `${name}: ${types[type]}`).join(', ');
    return [`Types: (${params}) => ${types[problem.returns]}`];
  },
  code(problem) {
    const names = problem.params.map(([name]) => name).join(', ');
    return [
      `function ${problem.function}(${names}) {`,
      '  // Your code here.',
      '}',
      '',
      `module.exports = ${problem.function};`,
    ];
  },
  prepare({ solutionPath, jsonPath }) {
    return { command: process.execPath, args: [path.join(RUNNERS_DIR, 'runner.js'), solutionPath, jsonPath] };
  },
};

const PYTHON_TYPES = { int: 'int', bool: 'bool', string: 'str', 'int[]': 'list[int]', 'string[]': 'list[str]' };
let pythonPath;

// The real interpreter, not a launcher, so that stopping a slow test stops it.
function findPython() {
  if (pythonPath === undefined) {
    pythonPath = null;
    for (const [command, ...args] of [['py', '-3'], ['python3'], ['python']]) {
      const probe = spawnSync(command, [...args, '-c', 'import sys; print(sys.executable)'], {
        encoding: 'utf8',
        windowsHide: true,
      });
      if (probe.status === 0 && probe.stdout.trim()) {
        pythonPath = probe.stdout.trim();
        break;
      }
    }
  }
  return pythonPath;
}

const python = {
  id: 'python',
  name: 'Python',
  aliases: ['py'],
  file: 'solution.py',
  comment: '#',
  timeScale: 3,
  paramName: snake,
  functionName: (problem) => snake(problem.function),
  paramNotes: {
    int: (name) => `${name} is an int. // is integer division and rounds down; / always gives a float.`,
    string: (name) => `${name} is a str: len(${name}), ${name}[i], ${name}[i:j]. A str cannot be changed in place.`,
    'int[]': (name) => `${name} is a list of int: len(${name}), ${name}[i], and ${name}[-1] is the last item.`,
    'string[]': (name) => `${name} is a list of str: len(${name}), ${name}[i].`,
  },
  returnNotes: {
    int: 'Return an int.',
    bool: 'Return True or False (capitalised).',
    string: 'Return a str. To build one piece by piece, collect the parts in a list and use "".join(parts).',
    'int[]': 'Return a list of int. Start with [] and .append(x), or make n zeros with [0] * n.',
  },
  notes(problem) {
    return reminders(this, problem);
  },
  code(problem) {
    const params = problem.params.map(([name, type]) => `${snake(name)}: ${PYTHON_TYPES[type]}`).join(', ');
    return [
      `def ${snake(problem.function)}(${params}) -> ${PYTHON_TYPES[problem.returns]}:`,
      '    # Your code here.',
      '    pass',
    ];
  },
  prepare({ problem, solutionPath, jsonPath }) {
    const interpreter = findPython();
    if (!interpreter) {
      return { error: 'Could not find Python. Is it installed and on your PATH?' };
    }
    const runner = path.join(RUNNERS_DIR, 'runner.py');
    // -u: unbuffered output. -B: do not leave __pycache__ folders behind.
    return { command: interpreter, args: ['-u', '-B', runner, solutionPath, snake(problem.function), jsonPath] };
  },
};

const JAVA_TYPES = { int: 'int', bool: 'boolean', string: 'String', 'int[]': 'int[]', 'string[]': 'String[]' };
const JAVA_READ = {
  int: 'readInt()',
  bool: 'readBool()',
  string: 'readString()',
  'int[]': 'readIntArray()',
  'string[]': 'readStringArray()',
};

const java = {
  id: 'java',
  name: 'Java',
  aliases: [],
  file: 'Solution.java',
  comment: '//',
  compiled: true,
  paramName: unchanged,
  functionName: (problem) => problem.function,
  paramNotes: {
    int: (name) => `${name} is an int. int / int drops the remainder.`,
    string: (name) =>
      `${name} is a String: ${name}.length(), and ${name}.charAt(i) gives a char. Compare strings with .equals(), not ==.`,
    'int[]': (name) => `${name} is an int[]: ${name}.length (no parentheses), ${name}[i].`,
    'string[]': (name) => `${name} is a String[]: ${name}.length, and each ${name}[i] is a String.`,
  },
  returnNotes: {
    int: 'Return an int (whole numbers up to about 2.1 billion).',
    bool: 'Return a boolean: true or false.',
    string: 'Return a String. To build one piece by piece, use a StringBuilder and .toString().',
    'int[]': 'Return an int[]. Create one with new int[size] or new int[] {a, b}.',
  },
  notes(problem) {
    return reminders(this, problem);
  },
  code(problem) {
    const params = problem.params.map(([name, type]) => `${JAVA_TYPES[type]} ${name}`).join(', ');
    const placeholder = { int: '0', bool: 'false', string: '""', 'int[]': 'new int[0]' }[problem.returns];
    return [
      'import java.util.*;',
      '',
      'class Solution {',
      `    public ${JAVA_TYPES[problem.returns]} ${problem.function}(${params}) {`,
      '        // Your code here. The return below only lets the file compile.',
      `        return ${placeholder};`,
      '    }',
      '}',
    ];
  },
  prepare({ problem, solutionPath, buildDir, textPath }) {
    const reads = problem.params
      .map(([name, type]) => `${JAVA_TYPES[type]} ${name} = ${JAVA_READ[type]};`)
      .join('\n            ');
    const call = `new Solution().${problem.function}(${problem.params.map(([name]) => name).join(', ')})`;
    const runnerPath = path.join(buildDir, 'Runner.java');
    fs.writeFileSync(runnerPath, template('Runner.java', { READS: reads, CALL: call }));

    const classes = path.join(buildDir, 'classes');
    fs.rmSync(classes, { recursive: true, force: true });
    const built = run('javac', ['-encoding', 'UTF-8', '-d', classes, runnerPath, solutionPath], buildDir);
    if (!built.ok) {
      return { error: shorten(built.output, solutionPath) };
    }
    return { command: 'java', args: ['-cp', classes, 'Runner', textPath] };
  },
};

const CSHARP_TYPES = { int: 'int', bool: 'bool', string: 'string', 'int[]': 'int[]', 'string[]': 'string[]' };
const CSHARP_READ = {
  int: 'ReadInt()',
  bool: 'ReadBool()',
  string: 'ReadString()',
  'int[]': 'ReadIntArray()',
  'string[]': 'ReadStringArray()',
};

const csharp = {
  id: 'csharp',
  name: 'C#',
  aliases: ['cs', 'c#', 'dotnet'],
  file: 'Solution.cs',
  comment: '//',
  compiled: true,
  paramName: unchanged,
  functionName: (problem) => pascal(problem.function),
  paramNotes: {
    int: (name) => `${name} is an int. int / int drops the remainder.`,
    string: (name) => `${name} is a string: ${name}.Length, and ${name}[i] gives a char.`,
    'int[]': (name) => `${name} is an int[]: ${name}.Length, ${name}[i].`,
    'string[]': (name) => `${name} is a string[]: ${name}.Length, and each ${name}[i] is a string.`,
  },
  returnNotes: {
    int: 'Return an int (whole numbers up to about 2.1 billion).',
    bool: 'Return a bool: true or false.',
    string: 'Return a string. To build one piece by piece, use a StringBuilder and .ToString().',
    'int[]': 'Return an int[]. Create one with new int[size] or new int[] { a, b }.',
  },
  notes(problem) {
    return reminders(this, problem);
  },
  code(problem) {
    const params = problem.params.map(([name, type]) => `${CSHARP_TYPES[type]} ${name}`).join(', ');
    const placeholder = { int: '0', bool: 'false', string: '""', 'int[]': 'new int[0]' }[problem.returns];
    return [
      'public class Solution',
      '{',
      `    public ${CSHARP_TYPES[problem.returns]} ${pascal(problem.function)}(${params})`,
      '    {',
      '        // Your code here. The return below only lets the file compile.',
      `        return ${placeholder};`,
      '    }',
      '}',
    ];
  },
  prepare({ problem, solutionPath, buildDir, textPath }) {
    const reads = problem.params
      .map(([name, type]) => `${CSHARP_TYPES[type]} ${name} = ${CSHARP_READ[type]};`)
      .join('\n            ');
    const call = `new Solution().${pascal(problem.function)}(${problem.params.map(([name]) => name).join(', ')})`;
    fs.writeFileSync(path.join(buildDir, 'Runner.cs'), template('Runner.cs', { READS: reads, CALL: call }));

    const version = run('dotnet', ['--version'], buildDir);
    if (!version.ok) {
      return { error: version.output };
    }
    const major = version.output.split(/\r?\n/).pop().split('.')[0];
    // The usual namespaces are imported for you, as on most assessment sites.
    const project = [
      '<Project Sdk="Microsoft.NET.Sdk">',
      '  <PropertyGroup>',
      '    <OutputType>Exe</OutputType>',
      `    <TargetFramework>net${major}.0</TargetFramework>`,
      '    <AssemblyName>Runner</AssemblyName>',
      '    <ImplicitUsings>enable</ImplicitUsings>',
      '    <Nullable>disable</Nullable>',
      '    <EnableDefaultCompileItems>false</EnableDefaultCompileItems>',
      '  </PropertyGroup>',
      '  <ItemGroup>',
      '    <Using Include="System.Text" />',
      '    <Compile Include="Runner.cs" />',
      `    <Compile Include="${solutionPath}" />`,
      '  </ItemGroup>',
      '</Project>',
    ];
    fs.writeFileSync(path.join(buildDir, 'Runner.csproj'), `${project.join('\n')}\n`);

    const built = run('dotnet', ['build', 'Runner.csproj', '-nologo', '-v', 'q', '-o', 'out', '-clp:NoSummary'], buildDir);
    if (!built.ok) {
      // Keep only the error lines, without the project path MSBuild appends.
      const errors = built.output
        .split(/\r?\n/)
        .filter((line) => /: error /.test(line))
        .map((line) => line.replace(/\s*\[[^\]]*\.csproj\]\s*$/, '').trim());
      const text = errors.length ? [...new Set(errors)].join('\n') : built.output;
      return { error: shorten(text, solutionPath) };
    }
    return { command: 'dotnet', args: [path.join(buildDir, 'out', 'Runner.dll'), textPath] };
  },
};

// In C an array arrives as a pointer plus a separate size, and a returned
// array reports its size through an extra return_size parameter.
function cSignature(problem) {
  const params = problem.params.flatMap(([name, type]) => {
    const local = snake(name);
    if (type === 'int[]') return [`int *${local}`, `int ${local}_size`];
    if (type === 'string[]') return [`char **${local}`, `int ${local}_size`];
    if (type === 'string') return [`char *${local}`];
    return [`${type === 'bool' ? 'bool' : 'int'} ${local}`];
  });
  if (problem.returns === 'int[]') params.push('int *return_size');
  const returns = { int: 'int ', bool: 'bool ', string: 'char *', 'int[]': 'int *' }[problem.returns];
  return `${returns}${snake(problem.function)}(${params.join(', ')})`;
}

const c = {
  id: 'c',
  name: 'C',
  aliases: [],
  file: 'solution.c',
  comment: '//',
  compiled: true,
  paramName: snake,
  functionName: (problem) => snake(problem.function),
  paramNotes: {
    int: (name) => `${name} is an int. int / int drops the remainder.`,
    string: (name) =>
      `${name} is a char * that ends with '\\0'. strlen(${name}) walks the whole string, so call it once and keep the result.`,
    'int[]': (name) => `${name} points to ${name}_size ints. C does not check that an index is in range.`,
    'string[]': (name) => `${name} points to ${name}_size strings; each ${name}[i] is a char *.`,
  },
  returnNotes: {
    int: 'Return an int. INT_MAX and INT_MIN are in <limits.h>.',
    bool: 'Return true or false (from <stdbool.h>).',
    string: "Return memory from malloc that holds the text and its final '\\0'. The caller frees it.",
    'int[]': 'Return memory from malloc, and store the number of items in *return_size.',
  },
  notes(problem) {
    return reminders(this, problem);
  },
  code(problem) {
    const placeholder = {
      int: ['    return 0;'],
      bool: ['    return false;'],
      string: ['    return NULL;'],
      'int[]': ['    *return_size = 0;', '    return NULL;'],
    }[problem.returns];
    return [
      '#include <stdbool.h>',
      '#include <stdlib.h>',
      '#include <string.h>',
      '',
      `${cSignature(problem)} {`,
      '    // Your code here. What follows only lets the file compile.',
      ...placeholder,
      '}',
    ];
  },
  prepare({ problem, solutionPath, buildDir, textPath }) {
    const reads = problem.params
      .map(([name, type]) => {
        const local = snake(name);
        if (type === 'int[]') return `int ${local}_size = 0;\n        int *${local} = pl_read_int_array(&${local}_size);`;
        if (type === 'string[]') return `int ${local}_size = 0;\n        char **${local} = pl_read_string_array(&${local}_size);`;
        if (type === 'string') return `char *${local} = pl_read_string();`;
        return `${type === 'bool' ? 'bool' : 'int'} ${local} = pl_read_int();`;
      })
      .join('\n        ');
    const args = problem.params.flatMap(([name, type]) =>
      type.endsWith('[]') ? [snake(name), `${snake(name)}_size`] : [snake(name)],
    );
    const name = snake(problem.function);
    const show = { int: 'int', bool: 'bool', string: 'string' }[problem.returns];
    const call =
      problem.returns === 'int[]'
        ? [
            'int pl_return_size = -1;',
            `int *pl_result = ${name}(${[...args, '&pl_return_size'].join(', ')});`,
            'char *pl_shown = pl_show_int_array(pl_result, pl_return_size);',
          ].join('\n        ')
        : `char *pl_shown = pl_show_${show}(${name}(${args.join(', ')}));`;

    const runnerPath = path.join(buildDir, 'runner.c');
    fs.writeFileSync(
      runnerPath,
      template('runner.c', {
        PROTOTYPE: cSignature(problem),
        READS: reads,
        CALL: call,
        SOLUTION: solutionPath.replaceAll('\\', '/'),
      }),
    );

    const program = path.join(buildDir, process.platform === 'win32' ? 'runner.exe' : 'runner');
    const built = run('gcc', ['-std=c17', '-Wall', '-O1', '-o', program, runnerPath], buildDir);
    // The runner includes solution.c, and gcc says so before every message.
    const messages = built.output
      .split(/\r?\n/)
      .filter((line) => !line.startsWith('In file included from'))
      .join('\n');
    if (!built.ok) {
      return { error: shorten(messages, solutionPath) };
    }
    return { command: program, args: [textPath], warnings: shorten(messages, solutionPath) };
  },
};

const LANGUAGES = [javascript, python, java, csharp, c];

function findLanguage(text) {
  const wanted = String(text ?? '').toLowerCase();
  return LANGUAGES.find((language) => language.id === wanted || language.aliases.includes(wanted));
}

// The whole starter file: guiding comments first, then the empty function.
function starterFile(problem, language) {
  const guide = [
    `${problem.number} - ${problem.title} (${problem.difficulty})`,
    ...wrap(problem.summary),
    'Full statement: ../README.md',
    '',
    'Before you type: solve the first example by hand and note each step.',
    ...wrap(`Nudge: ${problem.hints[0]}`),
    'For a stronger hint, one at a time: node practice/daily.js hint',
    '',
    ...language.notes(problem),
  ];
  const comments = guide.map((line) => (line ? `${language.comment} ${line}` : language.comment));
  return `${[...comments, '', ...language.code(problem)].join('\n')}\n`;
}

// Creates the starter file unless one is already there. Returns true if it did.
function writeStarter(problem, language, solutionPath) {
  if (fs.existsSync(solutionPath)) {
    return false;
  }
  fs.mkdirSync(path.dirname(solutionPath), { recursive: true });
  fs.writeFileSync(solutionPath, starterFile(problem, language));
  return true;
}

module.exports = { LANGUAGES, findLanguage, starterFile, writeStarter };
