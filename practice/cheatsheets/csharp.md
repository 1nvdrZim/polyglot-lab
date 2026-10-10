# JavaScript to C#

The syntax you reach for most in an assessment. Every variable, parameter and return value has a declared type, and method names start with a capital letter.

## Basics

| | JavaScript | C# |
| --- | --- | --- |
| Variable | `let count = 0;` | `int count = 0;` or `var count = 0;` |
| Other types | | `long`, `double`, `bool`, `char` (single quotes: `'a'`), `string` |
| Function | `function add(a, b) { return a + b; }` | `public int Add(int a, int b) { return a + b; }` |
| Equality | `===` | `==` (works for strings too) |
| Integer division | `Math.trunc(a / b)` | `a / b` (two ints already drop the remainder) |
| Largest, smallest | `Math.max(a, b)` | `Math.Max(a, b)`, `Math.Min(a, b)`, `Math.Abs(a)` |
| Limits | `Infinity` | `int.MaxValue`, `int.MinValue`; an `int` wraps around silently past about 2.1 billion, so use `long` for big totals |
| Print | `console.log(x)` | `Console.WriteLine(x);` |

## Loops

| | JavaScript | C# |
| --- | --- | --- |
| Count up | `for (let i = 0; i < n; i++)` | `for (int i = 0; i < n; i++)` |
| Each item | `for (const x of nums)` | `foreach (int x in nums)` |
| Each character | `for (const c of text)` | `foreach (char c in text)` |

## Strings

Strings cannot be changed in place. Use a `StringBuilder` to build one.

| | JavaScript | C# |
| --- | --- | --- |
| Length | `s.length` | `s.Length` |
| Character | `s[i]` | `s[i]` |
| Slice | `s.slice(a, b)` | `s.Substring(a, b - a)` (**the second argument is a length**) or `s[a..b]` |
| Lowercase | `s.toLowerCase()` | `s.ToLower()`; one char: `char.ToLower(c)` |
| Letter or digit? | `/[a-z0-9]/i.test(c)` | `char.IsLetterOrDigit(c)`, `char.IsDigit(c)` |
| Letter to 0-25 | `c.charCodeAt(0) - 97` | `c - 'a'` |
| Contains, find | `s.includes(x)`, `s.indexOf(x)` | `s.Contains(x)`, `s.IndexOf(x)` |
| Split, join | `s.split(' ')`, `parts.join('')` | `s.Split(' ')`, `string.Join("", parts)` |
| Convert | `Number(s)`, `String(n)` | `int.Parse(s)`, `n.ToString()` |
| Build | `out += x` | `var sb = new StringBuilder();` then `sb.Append(x)`, `sb.ToString()` |

## Arrays and lists

An array has a fixed size. A `List` grows.

| | JavaScript | C# |
| --- | --- | --- |
| Fixed array | `new Array(n).fill(0)` | `int[] a = new int[n];` (starts as zeros) |
| With values | `[1, 2, 3]` | `int[] a = { 1, 2, 3 };` or `new int[] { 1, 2, 3 }` |
| Length | `a.length` | `a.Length` |
| Sort, fill | `a.sort((x, y) => x - y)` | `Array.Sort(a);`, `Array.Fill(a, -1);` |
| Grid | | `int[,] grid = new int[rows, cols];` read as `grid[r, c]` |
| Growable list | `[]` | `var list = new List<int>();` |
| Add, read, size | `list.push(x)`, `list[i]`, `list.length` | `list.Add(x)`, `list[i]`, `list.Count` |
| Remove last | `list.pop()` | `list.RemoveAt(list.Count - 1)` |
| List to array | | `list.ToArray()` |

## Maps, sets, stacks and queues

| | JavaScript | C# |
| --- | --- | --- |
| Map | `new Map()` | `var d = new Dictionary<char, int>();` |
| Set a value | `m.set(k, v)` | `d[k] = v;` |
| Get with default | `m.get(k) ?? 0` | `d.GetValueOrDefault(k)` (reading a missing key with `d[k]` throws) |
| Get if present | | `if (d.TryGetValue(k, out int v)) { ... }` |
| Has key | `m.has(k)` | `d.ContainsKey(k)` |
| Count things | `m.set(k, (m.get(k) ?? 0) + 1)` | `d[k] = d.GetValueOrDefault(k) + 1;` |
| Each entry | `for (const [k, v] of m)` | `foreach (var pair in d)` with `pair.Key`, `pair.Value` |
| Set | `new Set()`, `s.add(x)`, `s.has(x)` | `var s = new HashSet<int>();`, `s.Add(x)`, `s.Contains(x)` |
| Stack | array with `push`, `pop` | `var stack = new Stack<int>();`, `Push(x)`, `Pop()`, `Peek()`, `Count` |
| Queue | array with `push`, `shift` | `var queue = new Queue<int>();`, `Enqueue(x)`, `Dequeue()` |

The collections live in `System.Collections.Generic` and `StringBuilder` in `System.Text`. The practice runner imports both for you, as most assessment sites do; in your own projects add the `using` lines.
