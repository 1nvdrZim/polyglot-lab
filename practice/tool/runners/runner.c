// Test runner for C solutions. The tool fills in the marked places for each
// problem and compiles this file, which pulls in your solution.c at the end.
// It prints one "@@" line per test; anything else on standard output is shown
// to you as your own debug output.
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define PL_UNUSED __attribute__((unused))

/*PROTOTYPE*/;

static FILE *pl_file;

static void pl_bad_data(void) {
    fprintf(stderr, "The test data could not be read.\n");
    exit(2);
}

PL_UNUSED static int pl_read_int(void) {
    int value = 0;
    if (fscanf(pl_file, "%d", &value) != 1) {
        pl_bad_data();
    }
    return value;
}

PL_UNUSED static int pl_hex_digit(char digit) {
    return digit <= '9' ? digit - '0' : digit - 'a' + 10;
}

// A string is stored as its byte length, then its bytes in hexadecimal.
PL_UNUSED static char *pl_read_string(void) {
    int length = pl_read_int();
    char *hex = malloc((size_t)length * 2 + 2);
    char *text = malloc((size_t)length + 1);
    if (fscanf(pl_file, "%s", hex) != 1) {
        pl_bad_data();
    }
    for (int i = 0; i < length; i++) {
        text[i] = (char)(pl_hex_digit(hex[2 * i]) * 16 + pl_hex_digit(hex[2 * i + 1]));
    }
    text[length] = '\0';
    free(hex);
    return text;
}

PL_UNUSED static int *pl_read_int_array(int *size) {
    *size = pl_read_int();
    int *items = malloc(sizeof(int) * ((size_t)*size + 1));
    for (int i = 0; i < *size; i++) {
        items[i] = pl_read_int();
    }
    return items;
}

PL_UNUSED static char **pl_read_string_array(int *size) {
    *size = pl_read_int();
    char **items = malloc(sizeof(char *) * ((size_t)*size + 1));
    for (int i = 0; i < *size; i++) {
        items[i] = pl_read_string();
    }
    return items;
}

PL_UNUSED static char *pl_show_int(int value) {
    char *shown = malloc(32);
    sprintf(shown, "i %d", value);
    return shown;
}

PL_UNUSED static char *pl_show_bool(bool value) {
    char *shown = malloc(8);
    sprintf(shown, "b %d", value ? 1 : 0);
    return shown;
}

PL_UNUSED static char *pl_show_string(const char *text) {
    if (text == NULL) {
        char *shown = malloc(8);
        strcpy(shown, "null");
        return shown;
    }
    size_t length = strlen(text);
    char *shown = malloc(length * 2 + 40);
    int used = sprintf(shown, "s %d ", (int)length);
    if (length == 0) {
        shown[used++] = '-';
    }
    for (size_t i = 0; i < length; i++) {
        used += sprintf(shown + used, "%02x", (unsigned char)text[i]);
    }
    shown[used] = '\0';
    return shown;
}

// Returns NULL when the pointer and size cannot describe a real array.
PL_UNUSED static char *pl_show_int_array(const int *items, int size) {
    if (size < 0 || size > 50000000 || (items == NULL && size > 0)) {
        return NULL;
    }
    char *shown = malloc((size_t)size * 12 + 40);
    int used = sprintf(shown, "a %d", size);
    for (int i = 0; i < size; i++) {
        used += sprintf(shown + used, " %d", items[i]);
    }
    return shown;
}

int main(int pl_argc, char **pl_argv) {
    if (pl_argc < 3) {
        return 2;
    }
    // Unbuffered, so anything you print still appears if the program crashes.
    setvbuf(stdout, NULL, _IONBF, 0);
    pl_file = fopen(pl_argv[1], "r");
    if (pl_file == NULL) {
        pl_bad_data();
    }
    int pl_start = atoi(pl_argv[2]);
    int pl_total = pl_read_int();
    for (int pl_test = 0; pl_test < pl_total; pl_test++) {
        /*READS*/
        if (pl_test < pl_start) {
            continue;
        }
        printf("@@BEGIN %d\n", pl_test);
        /*CALL*/
        if (pl_shown == NULL) {
            printf("@@ERROR %d the returned array cannot be used: the pointer is NULL or *return_size was not set\n", pl_test);
        } else {
            printf("@@RESULT %d %s\n", pl_test, pl_shown);
        }
    }
    return 0;
}

#include "/*SOLUTION*/"
