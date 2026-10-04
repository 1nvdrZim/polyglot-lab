// Lesson 02 - loops, conditionals, functions that return booleans.

#include <print>
#include <string>

// Returning std::string by value is safe and cheap: the string owns its
// memory, unlike a raw char* in C.
std::string fizzbuzz(int n) {
    if (n % 15 == 0) return "FizzBuzz";
    if (n % 3 == 0) return "Fizz";
    if (n % 5 == 0) return "Buzz";
    return std::to_string(n);
}

bool is_prime(int n) {
    if (n < 2) return false;
    for (int divisor = 2; divisor * divisor <= n; divisor++) {
        if (n % divisor == 0) return false;
    }
    return true;
}

int main() {
    for (int i = 1; i <= 15; i++) {
        std::println("{}", fizzbuzz(i));
    }

    // print (no newline) vs println (newline).
    std::print("Primes below 30:");
    for (int n = 2; n < 30; n++) {
        if (is_prime(n)) {
            std::print(" {}", n);
        }
    }
    std::println("");
}
