# JavaScript to Python

The syntax you reach for most in an assessment. Blocks use a colon and indentation instead of braces, and there are no semicolons.

## Basics

| | JavaScript | Python |
| --- | --- | --- |
| Variable | `let count = 0;` | `count = 0` |
| Function | `function add(a, b) { return a + b; }` | `def add(a, b):` then an indented `return a + b` |
| Equality | `===`, `!==` | `==`, `!=` |
| Logic | `&&`, `\|\|`, `!` | `and`, `or`, `not` |
| Nothing | `null`, `undefined` | `None` |
| Booleans | `true`, `false` | `True`, `False` |
| Ternary | `ok ? a : b` | `a if ok else b` |
| Integer division | `Math.trunc(a / b)` | `a // b` rounds down; `int(a / b)` truncates toward zero |
| Largest, smallest | `Math.max(a, b)`, `Math.min(a, b)` | `max(a, b)`, `min(a, b)` |
| Infinity | `Infinity` | `float('inf')` |
| Print | `console.log(x)` | `print(x)` |

## Loops

| | JavaScript | Python |
| --- | --- | --- |
| Count up | `for (let i = 0; i < n; i++)` | `for i in range(n):` |
| Count down | `for (let i = n - 1; i >= 0; i--)` | `for i in range(n - 1, -1, -1):` |
| Each item | `for (const x of items)` | `for x in items:` |
| Index and item | `items.forEach((x, i) => ...)` | `for i, x in enumerate(items):` |
| While | `while (left < right) { }` | `while left < right:` |

## Strings

Strings cannot be changed in place. Build a list of parts and join it.

| | JavaScript | Python |
| --- | --- | --- |
| Length | `s.length` | `len(s)` |
| Character | `s[i]` | `s[i]` |
| Slice | `s.slice(a, b)` | `s[a:b]` |
| Reverse | `[...s].reverse().join('')` | `s[::-1]` |
| Lowercase | `s.toLowerCase()` | `s.lower()` |
| Letter or digit? | `/[a-z0-9]/i.test(c)` | `c.isalnum()` |
| Contains | `s.includes(x)` | `x in s` |
| Split, join | `s.split(' ')`, `parts.join('')` | `s.split(' ')`, `''.join(parts)` |
| Character code | `s.charCodeAt(i)`, `String.fromCharCode(n)` | `ord(s[i])`, `chr(n)` |
| Convert | `Number(s)`, `String(n)` | `int(s)`, `str(n)` |

## Lists (arrays)

| | JavaScript | Python |
| --- | --- | --- |
| Create | `[]`, `new Array(n).fill(0)` | `[]`, `[0] * n` |
| Length | `a.length` | `len(a)` |
| Last item | `a[a.length - 1]` | `a[-1]` |
| Add, remove at end | `a.push(x)`, `a.pop()` | `a.append(x)`, `a.pop()` |
| Sort numbers | `a.sort((x, y) => x - y)` | `a.sort()` |
| Sort descending | `a.sort((x, y) => y - x)` | `a.sort(reverse=True)` |
| Sort by a key | `a.sort((x, y) => key(x) - key(y))` | `a.sort(key=lambda x: key(x))` |
| Sum, largest | `a.reduce((s, x) => s + x, 0)`, `Math.max(...a)` | `sum(a)`, `max(a)` |
| Grid of zeros | `Array.from({ length: rows }, () => new Array(cols).fill(0))` | `[[0] * cols for _ in range(rows)]` |

## Maps, sets, stacks and queues

| | JavaScript | Python |
| --- | --- | --- |
| Map | `new Map()` | `{}` |
| Set a value | `m.set(k, v)` | `m[k] = v` |
| Get with default | `m.get(k) ?? 0` | `m.get(k, 0)` |
| Has key | `m.has(k)` | `k in m` |
| Count things | `m.set(k, (m.get(k) ?? 0) + 1)` | `m[k] = m.get(k, 0) + 1` |
| Each entry | `for (const [k, v] of m)` | `for k, v in m.items():` |
| Set | `new Set()`, `s.add(x)`, `s.has(x)` | `set()`, `s.add(x)`, `x in s` |
| Stack | array with `push`, `pop` | list with `append`, `pop` |
| Queue | array with `push`, `shift` | `from collections import deque`, then `q.append(x)`, `q.popleft()` |
