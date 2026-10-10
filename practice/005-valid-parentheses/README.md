# 005 · Valid parentheses

*Easy · aim for 15 minutes*

Given a string containing only the characters `(`, `)`, `[`, `]`, `{` and `}`, return true if the brackets are balanced.

Balanced means every opening bracket is closed by the same kind of bracket, and brackets close in the correct order.

| Input | Output | Why |
| --- | --- | --- |
| `text = "()[]{}"` | `true` | each pair closes straight away |
| `text = "([{}])"` | `true` | inner brackets close before outer ones |
| `text = "(]"` | `false` | the wrong kind of bracket closes it |
| `text = "(()"` | `false` | one bracket is never closed |
| `text = ""` | `true` | nothing is left open |

**Constraints**

- `0 <= text.length <= 100000`
