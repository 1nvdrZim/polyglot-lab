// Lesson 01 - variables, types, functions, formatting.
// C# is statically typed like Java, but "top-level statements" let a small
// program skip the class and Main boilerplate. Run with: dotnet run Program.cs

string name = "Polyglot Lab";
Console.WriteLine($"Hello, {name}!");

double[] readings = [18.5, 21.0, 23.5, 19.0, 24.5];
Console.WriteLine($"Readings: {readings.Length}");
Console.WriteLine($"Average: {Average(readings):F1}");

// int / int stays an int. Make one side a double to get a double.
Console.WriteLine($"7 / 2 = {7 / 2} (integer)");
Console.WriteLine($"7 / 2 = {7 / 2.0} (floating point)");

// Local functions may be declared after the statements that call them.
static double Average(double[] values)
{
    double sum = 0;
    foreach (double value in values)
    {
        sum += value;
    }
    return sum / values.Length;
}
