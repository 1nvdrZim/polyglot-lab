// Test runner for C# solutions. The tool fills in the two marked places for
// each problem, then builds this file together with your Solution.cs.
// It prints one "@@" line per test; anything else on standard output is shown
// to you as your own debug output.
using System.Diagnostics;
using System.Globalization;
using System.Text;

public static class Runner
{
    private static string[] plTokens = new string[0];
    private static int plPosition;

    private static int ReadInt()
    {
        return int.Parse(plTokens[plPosition++], CultureInfo.InvariantCulture);
    }

    private static bool ReadBool()
    {
        return ReadInt() != 0;
    }

    // A string is stored as its byte length, then its bytes in hexadecimal.
    private static string ReadString()
    {
        int length = ReadInt();
        string hex = plTokens[plPosition++];
        return length == 0 ? "" : Encoding.UTF8.GetString(Convert.FromHexString(hex));
    }

    private static int[] ReadIntArray()
    {
        var items = new int[ReadInt()];
        for (int i = 0; i < items.Length; i++)
        {
            items[i] = ReadInt();
        }
        return items;
    }

    private static string[] ReadStringArray()
    {
        var items = new string[ReadInt()];
        for (int i = 0; i < items.Length; i++)
        {
            items[i] = ReadString();
        }
        return items;
    }

    private static string Show(int value)
    {
        return "i " + value.ToString(CultureInfo.InvariantCulture);
    }

    private static string Show(bool value)
    {
        return value ? "b 1" : "b 0";
    }

    private static string Show(string value)
    {
        if (value == null)
        {
            return "null";
        }
        byte[] bytes = Encoding.UTF8.GetBytes(value);
        string hex = bytes.Length == 0 ? "-" : Convert.ToHexString(bytes).ToLowerInvariant();
        return "s " + bytes.Length.ToString(CultureInfo.InvariantCulture) + " " + hex;
    }

    private static string Show(int[] value)
    {
        if (value == null)
        {
            return "null";
        }
        var text = new StringBuilder("a " + value.Length.ToString(CultureInfo.InvariantCulture));
        foreach (int item in value)
        {
            text.Append(' ').Append(item.ToString(CultureInfo.InvariantCulture));
        }
        return text.ToString();
    }

    private static string Describe(Exception error)
    {
        string text = (error.GetType().Name + ": " + error.Message).ReplaceLineEndings(" ");
        foreach (StackFrame frame in new StackTrace(error, true).GetFrames())
        {
            string file = frame.GetFileName();
            if (file != null && file.EndsWith("Solution.cs", StringComparison.OrdinalIgnoreCase))
            {
                return text + " (Solution.cs line " + frame.GetFileLineNumber() + ")";
            }
        }
        return text;
    }

    public static void Main(string[] plArgs)
    {
        plTokens = File.ReadAllText(plArgs[0]).Split((char[])null, StringSplitOptions.RemoveEmptyEntries);
        int plStart = int.Parse(plArgs[1], CultureInfo.InvariantCulture);
        int plTotal = ReadInt();
        for (int plTest = 0; plTest < plTotal; plTest++)
        {
            /*READS*/
            if (plTest < plStart)
            {
                continue;
            }
            Console.WriteLine("@@BEGIN " + plTest);
            string plLine;
            try
            {
                plLine = "@@RESULT " + plTest + " " + Show(/*CALL*/);
            }
            catch (Exception plError)
            {
                plLine = "@@ERROR " + plTest + " " + Describe(plError);
            }
            Console.WriteLine(plLine);
        }
    }
}
