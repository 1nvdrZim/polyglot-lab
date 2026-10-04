// Lesson 02 - loops, conditionals, functions that return booleans.

#include <stdbool.h>
#include <stdio.h>

// Returning a string from a C function is awkward (who owns the memory?),
// so this version prints directly instead of returning a value.
static void print_fizzbuzz(int n) {
    if (n % 15 == 0) {
        puts("FizzBuzz");
    } else if (n % 3 == 0) {
        puts("Fizz");
    } else if (n % 5 == 0) {
        puts("Buzz");
    } else {
        printf("%d\n", n);
    }
}

static bool is_prime(int n) {
    if (n < 2) return false;
    for (int divisor = 2; divisor * divisor <= n; divisor++) {
        if (n % divisor == 0) return false;
    }
    return true;
}

int main(void) {
    for (int i = 1; i <= 15; i++) {
        print_fizzbuzz(i);
    }

    printf("Primes below 30:");
    for (int n = 2; n < 30; n++) {
        if (is_prime(n)) {
            printf(" %d", n);
        }
    }
    printf("\n");
    return 0;
}
