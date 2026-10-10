# JavaScript to C

C gives you much less than the other languages: no string type, no growable arrays, no map or set. Most of the work is doing by hand what they do for you.

## Basics

| | JavaScript | C |
| --- | --- | --- |
| Variable | `let count = 0;` | `int count = 0;` |
| Other types | | `long long`, `double`, `char` (single quotes: `'a'`), `bool` from `<stdbool.h>` |
| Function | `function add(a, b) { return a + b; }` | `int add(int a, int b) { return a + b; }` |
| Integer division | `Math.trunc(a / b)` | `a / b` (two ints already drop the remainder) |
| Largest of two | `Math.max(a, b)` | `a > b ? a : b` (there is no built-in) |
| Limits | `Infinity` | `INT_MAX`, `INT_MIN` from `<limits.h>`; use `long long` for big totals |
| Count up | `for (let i = 0; i < n; i++)` | `for (int i = 0; i < n; i++)` |
| Print | `console.log(x)` | `printf("%d %s %c\n", number, text, character);` from `<stdio.h>` |

## Strings

A string is a `char *`: characters in a row, ending with the character `'\0'`.

| | JavaScript | C |
| --- | --- | --- |
| Length | `s.length` | `strlen(s)` walks the whole string, so call it once and keep the result |
| Character | `s[i]` | `s[i]` |
| Equal? | `a === b` | `strcmp(a, b) == 0` (`a == b` compares addresses, not text) |
| Each character | `for (const c of s)` | `for (int i = 0; s[i] != '\0'; i++)` |
| Letter to 0-25 | `c.charCodeAt(0) - 97` | `c - 'a'` |
| Letter or digit? | `/[a-z0-9]/i.test(c)` | `isalnum(c)`, `isdigit(c)`, `tolower(c)` from `<ctype.h>` |
| Convert | `Number(s)`, `String(n)` | `atoi(s)`, `sprintf(buffer, "%d", n)` |

To return a new string, allocate room for it plus the final `'\0'`:

```c
char *out = malloc(length + 1);
// ... fill out[0] to out[length - 1] ...
out[length] = '\0';
return out;
```

## Arrays

An array does not know its own length, so every array parameter comes with a size, such as `nums` and `nums_size`. C does not check that an index is in range: reading or writing outside the array crashes or silently corrupts memory.

| | JavaScript | C |
| --- | --- | --- |
| Fixed, zeroed | `new Array(26).fill(0)` | `int counts[26] = {0};` |
| Sized at run time | `new Array(n).fill(0)` | `int *a = calloc(n, sizeof(int));` (zeroed) or `malloc(sizeof(int) * n)` (not zeroed) |
| Release | (automatic) | `free(a);` |

An array declared inside a function disappears when the function returns. To return an array, allocate it and report its size:

```c
int *result = malloc(sizeof(int) * count);
// ... fill result ...
*return_size = count;
return result;
```

## Doing without a map or a set

- **Small range of keys**: use an array indexed by the key. For characters: `int counts[256] = {0};` then `counts[(unsigned char)s[i]]++;`.
- **Any numbers**: sort first, so that equal values end up next to each other.

```c
static int compare_ints(const void *a, const void *b) {
    int x = *(const int *)a;
    int y = *(const int *)b;
    return (x > y) - (x < y);
}

qsort(nums, nums_size, sizeof(int), compare_ints);
```

## Stack

An array and a counter:

```c
int stack[1000];
int top = 0;

stack[top++] = value;      // push
value = stack[--top];      // pop
// the stack is empty when top == 0
```
