// Lesson 02 - loops, conditionals, functions that return booleans.

public class Main {

    static String fizzbuzz(int n) {
        if (n % 15 == 0) return "FizzBuzz";
        if (n % 3 == 0) return "Fizz";
        if (n % 5 == 0) return "Buzz";
        return String.valueOf(n);
    }

    static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int divisor = 2; divisor * divisor <= n; divisor++) {
            if (n % divisor == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        for (int i = 1; i <= 15; i++) {
            System.out.println(fizzbuzz(i));
        }

        // print (no newline) vs println (newline).
        System.out.print("Primes below 30:");
        for (int n = 2; n < 30; n++) {
            if (isPrime(n)) {
                System.out.print(" " + n);
            }
        }
        System.out.println();
    }
}
