# Lesson 02 - loops, conditionals, functions that return booleans.
# Blocks are defined by indentation, not braces.


def fizzbuzz(n: int) -> str:
    if n % 15 == 0:
        return "FizzBuzz"
    if n % 3 == 0:
        return "Fizz"
    if n % 5 == 0:
        return "Buzz"
    return str(n)


def is_prime(n: int) -> bool:
    if n < 2:
        return False
    divisor = 2
    while divisor * divisor <= n:
        if n % divisor == 0:
            return False
        divisor += 1
    return True


# range(1, 16) stops *before* 16.
for i in range(1, 16):
    print(fizzbuzz(i))

print("Primes below 30:", end="")
for n in range(2, 30):
    if is_prime(n):
        print(f" {n}", end="")
print()
