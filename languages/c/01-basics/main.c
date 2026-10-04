// Lesson 01 - variables, types, functions, formatting.
// C is statically typed and compiled to a native executable. There are no
// strings or growable arrays built in: a string is a char array ending in '\0',
// and an array does not know its own length.

#include <stdio.h>

// The length has to be passed separately because `values` is just a pointer
// to the first element once it crosses a function boundary.
static double average(const double *values, int count) {
    double sum = 0;
    for (int i = 0; i < count; i++) {
        sum += values[i];
    }
    return sum / count;
}

int main(void) {
    const char *name = "Polyglot Lab";
    printf("Hello, %s!\n", name);

    double readings[] = {18.5, 21.0, 23.5, 19.0, 24.5};
    // sizeof works here only because `readings` is still a real array.
    int count = sizeof(readings) / sizeof(readings[0]);
    printf("Readings: %d\n", count);
    printf("Average: %.1f\n", average(readings, count));

    // int / int stays an int. Make one side a double to get a double.
    printf("7 / 2 = %d (integer)\n", 7 / 2);
    printf("7 / 2 = %g (floating point)\n", 7 / 2.0);
    return 0;
}
