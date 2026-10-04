// Lesson 02 - loops, conditionals, functions that return booleans.

for (int i = 1; i <= 15; i++)
{
    Console.WriteLine(FizzBuzz(i));
}

// Write (no newline) vs WriteLine (newline).
Console.Write("Primes below 30:");
for (int n = 2; n < 30; n++)
{
    if (IsPrime(n))
    {
        Console.Write($" {n}");
    }
}
Console.WriteLine();

// A switch expression with tuple patterns: `_` matches anything.
static string FizzBuzz(int n) => (n % 3, n % 5) switch
{
    (0, 0) => "FizzBuzz",
    (0, _) => "Fizz",
    (_, 0) => "Buzz",
    _ => n.ToString(),
};

static bool IsPrime(int n)
{
    if (n < 2) return false;
    for (int divisor = 2; divisor * divisor <= n; divisor++)
    {
        if (n % divisor == 0) return false;
    }
    return true;
}
