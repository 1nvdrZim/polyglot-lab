# JavaScript to Java

The syntax you reach for most in an assessment. Every variable, parameter and return value has a declared type, and all code lives inside a class.

## Basics

| | JavaScript | Java |
| --- | --- | --- |
| Variable | `let count = 0;` | `int count = 0;` |
| Other types | | `long`, `double`, `boolean`, `char` (single quotes: `'a'`), `String` |
| Function | `function add(a, b) { return a + b; }` | `public int add(int a, int b) { return a + b; }` |
| Equality | `===` | `==` for numbers and chars; **`a.equals(b)` for strings** |
| Integer division | `Math.trunc(a / b)` | `a / b` (two ints already drop the remainder) |
| Largest, smallest | `Math.max(a, b)` | `Math.max(a, b)`, `Math.min(a, b)`, `Math.abs(a)` |
| Limits | `Infinity` | `Integer.MAX_VALUE`, `Integer.MIN_VALUE`; an `int` wraps around silently past about 2.1 billion, so use `long` for big totals |
| Print | `console.log(x)` | `System.out.println(x);` |

## Loops

| | JavaScript | Java |
| --- | --- | --- |
| Count up | `for (let i = 0; i < n; i++)` | `for (int i = 0; i < n; i++)` |
| Each item | `for (const x of nums)` | `for (int x : nums)` |
| Each character | `for (const c of text)` | `for (char c : text.toCharArray())` |

## Strings

Strings cannot be changed in place. Use a `StringBuilder` to build one.

| | JavaScript | Java |
| --- | --- | --- |
| Length | `s.length` | `s.length()` |
| Character | `s[i]` | `s.charAt(i)` |
| Slice | `s.slice(a, b)` | `s.substring(a, b)` |
| Lowercase | `s.toLowerCase()` | `s.toLowerCase()`; one char: `Character.toLowerCase(c)` |
| Letter or digit? | `/[a-z0-9]/i.test(c)` | `Character.isLetterOrDigit(c)`, `Character.isDigit(c)` |
| Letter to 0-25 | `c.charCodeAt(0) - 97` | `c - 'a'` |
| Contains, find | `s.includes(x)`, `s.indexOf(x)` | `s.contains(x)`, `s.indexOf(x)` |
| Split, join | `s.split(' ')`, `parts.join('')` | `s.split(" ")`, `String.join("", parts)` |
| Convert | `Number(s)`, `String(n)` | `Integer.parseInt(s)`, `String.valueOf(n)` |
| Build | `out += x` | `StringBuilder sb = new StringBuilder();` then `sb.append(x)`, `sb.toString()` |

## Arrays and lists

An array has a fixed size. A `List` grows.

| | JavaScript | Java |
| --- | --- | --- |
| Fixed array | `new Array(n).fill(0)` | `int[] a = new int[n];` (starts as zeros) |
| With values | `[1, 2, 3]` | `int[] a = {1, 2, 3};` or `new int[] {1, 2, 3}` |
| Length | `a.length` | `a.length` (no parentheses) |
| Sort, fill | `a.sort((x, y) => x - y)` | `Arrays.sort(a);`, `Arrays.fill(a, -1);` |
| Grid | | `int[][] grid = new int[rows][cols];` |
| Growable list | `[]` | `List<Integer> list = new ArrayList<>();` |
| Add, read, size | `list.push(x)`, `list[i]`, `list.length` | `list.add(x)`, `list.get(i)`, `list.size()` |
| Remove last | `list.pop()` | `list.remove(list.size() - 1)` |
| List to `int[]` | | loop, or `list.stream().mapToInt(Integer::intValue).toArray()` |

Collections hold objects, so they use `Integer`, `Character`, `Long` and `Boolean` in the angle brackets, not `int` or `char`.

## Maps, sets, stacks and queues

| | JavaScript | Java |
| --- | --- | --- |
| Map | `new Map()` | `Map<Character, Integer> m = new HashMap<>();` |
| Set a value | `m.set(k, v)` | `m.put(k, v)` |
| Get with default | `m.get(k) ?? 0` | `m.getOrDefault(k, 0)` (plain `m.get(k)` gives `null` when missing) |
| Has key | `m.has(k)` | `m.containsKey(k)` |
| Count things | `m.set(k, (m.get(k) ?? 0) + 1)` | `m.merge(k, 1, Integer::sum)` |
| Each entry | `for (const [k, v] of m)` | `for (Map.Entry<Character, Integer> e : m.entrySet())` with `e.getKey()`, `e.getValue()` |
| Set | `new Set()`, `s.add(x)`, `s.has(x)` | `Set<Integer> s = new HashSet<>();`, `s.add(x)`, `s.contains(x)` |
| Stack | array with `push`, `pop` | `Deque<Integer> stack = new ArrayDeque<>();`, `push(x)`, `pop()`, `peek()`, `isEmpty()` |
| Queue | array with `push`, `shift` | `Deque<Integer> queue = new ArrayDeque<>();`, `offer(x)`, `poll()` |

All of these need `import java.util.*;` at the top of the file. The starter files already include it.
