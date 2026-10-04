// Lesson 03 - counting words without a built-in hash map.
// C has no dictionary type, so this uses a fixed array of structs and a
// linear search. It is O(n^2), which is fine for a sentence and shows what
// the other languages' maps are doing for you.

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_WORDS 64
#define MAX_LEN 32

typedef struct {
    char word[MAX_LEN];
    int count;
} Entry;

// qsort calls this with untyped pointers to two elements.
// Negative means a sorts first: count descending, then word ascending.
static int compare_entries(const void *a, const void *b) {
    const Entry *x = a;
    const Entry *y = b;
    if (x->count != y->count) return y->count - x->count;
    return strcmp(x->word, y->word);
}

int main(void) {
    // A char array (not a pointer to a literal) because strtok modifies it.
    char text[] = "the quick brown fox jumps over the lazy dog the fox";

    Entry entries[MAX_WORDS];
    int used = 0;

    for (char *token = strtok(text, " "); token != NULL; token = strtok(NULL, " ")) {
        int i = 0;
        while (i < used && strcmp(entries[i].word, token) != 0) {
            i++;
        }
        if (i == used) {
            if (used == MAX_WORDS) break;
            // snprintf always terminates the string and never overflows.
            snprintf(entries[used].word, MAX_LEN, "%s", token);
            entries[used].count = 0;
            used++;
        }
        entries[i].count++;
    }

    qsort(entries, used, sizeof(Entry), compare_entries);

    for (int i = 0; i < used; i++) {
        printf("%s: %d\n", entries[i].word, entries[i].count);
    }
    return 0;
}
