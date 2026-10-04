// Lesson 01 - variables, types, functions, formatting.
// Java is statically typed: every variable has a type fixed at compile time.
// All code lives inside a class; execution starts at `main`.

public class Main {

    static double average(double[] values) {
        double sum = 0;
        for (double value : values) {
            sum += value;
        }
        return sum / values.length;
    }

    public static void main(String[] args) {
        String name = "Polyglot Lab";
        System.out.println("Hello, " + name + "!");

        double[] readings = {18.5, 21.0, 23.5, 19.0, 24.5};
        System.out.println("Readings: " + readings.length);
        System.out.printf("Average: %.1f%n", average(readings));

        // int / int stays an int. Make one side a double to get a double.
        System.out.println("7 / 2 = " + (7 / 2) + " (integer)");
        System.out.println("7 / 2 = " + (7 / 2.0) + " (floating point)");
    }
}
