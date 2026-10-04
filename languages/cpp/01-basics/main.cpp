// Lesson 01 - variables, types, functions, formatting.
// C++ compiles to native code like C, but the standard library provides real
// strings and containers that know their own size and free their own memory.
// Built as C++23 for std::println.

#include <numeric>
#include <print>
#include <string>
#include <vector>

// `const&` passes the vector without copying it and promises not to modify it.
double average(const std::vector<double>& values) {
    double sum = std::accumulate(values.begin(), values.end(), 0.0);
    return sum / values.size();
}

int main() {
    std::string name = "Polyglot Lab";
    std::println("Hello, {}!", name);

    std::vector<double> readings = {18.5, 21.0, 23.5, 19.0, 24.5};
    std::println("Readings: {}", readings.size());
    std::println("Average: {:.1f}", average(readings));

    // int / int stays an int. Make one side a double to get a double.
    std::println("7 / 2 = {} (integer)", 7 / 2);
    std::println("7 / 2 = {} (floating point)", 7 / 2.0);
}
