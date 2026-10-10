// Test runner for Java solutions. The tool fills in the two marked places for
// each problem, then compiles this file together with your Solution.java.
// It prints one "@@" line per test; anything else on standard output is shown
// to you as your own debug output.
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Runner {
    private static String[] plTokens;
    private static int plPosition;

    private static int readInt() {
        return Integer.parseInt(plTokens[plPosition++]);
    }

    private static boolean readBool() {
        return readInt() != 0;
    }

    // A string is stored as its byte length, then its bytes in hexadecimal.
    private static String readString() {
        int length = readInt();
        String hex = plTokens[plPosition++];
        byte[] bytes = new byte[length];
        for (int i = 0; i < length; i++) {
            bytes[i] = (byte) Integer.parseInt(hex.substring(2 * i, 2 * i + 2), 16);
        }
        return new String(bytes, StandardCharsets.UTF_8);
    }

    private static int[] readIntArray() {
        int[] items = new int[readInt()];
        for (int i = 0; i < items.length; i++) {
            items[i] = readInt();
        }
        return items;
    }

    private static String[] readStringArray() {
        String[] items = new String[readInt()];
        for (int i = 0; i < items.length; i++) {
            items[i] = readString();
        }
        return items;
    }

    private static String show(int value) {
        return "i " + value;
    }

    private static String show(boolean value) {
        return value ? "b 1" : "b 0";
    }

    private static String show(String value) {
        if (value == null) {
            return "null";
        }
        byte[] bytes = value.getBytes(StandardCharsets.UTF_8);
        StringBuilder text = new StringBuilder("s " + bytes.length + " ");
        if (bytes.length == 0) {
            text.append('-');
        }
        for (byte b : bytes) {
            text.append(Character.forDigit((b >> 4) & 0xF, 16)).append(Character.forDigit(b & 0xF, 16));
        }
        return text.toString();
    }

    private static String show(int[] value) {
        if (value == null) {
            return "null";
        }
        StringBuilder text = new StringBuilder("a " + value.length);
        for (int item : value) {
            text.append(' ').append(item);
        }
        return text.toString();
    }

    private static String describe(Throwable error) {
        String text = error.toString().replaceAll("\\s+", " ");
        for (StackTraceElement frame : error.getStackTrace()) {
            if (frame.getClassName().startsWith("Solution")) {
                return text + " (Solution.java line " + frame.getLineNumber() + ")";
            }
        }
        return text;
    }

    public static void main(String[] plArgs) throws Exception {
        String plData = new String(Files.readAllBytes(Paths.get(plArgs[0])), StandardCharsets.UTF_8);
        plTokens = plData.trim().split("\\s+");
        int plStart = Integer.parseInt(plArgs[1]);
        int plTotal = readInt();
        for (int plTest = 0; plTest < plTotal; plTest++) {
            /*READS*/
            if (plTest < plStart) {
                continue;
            }
            System.out.println("@@BEGIN " + plTest);
            System.out.flush();
            String plLine;
            try {
                plLine = "@@RESULT " + plTest + " " + show(/*CALL*/);
            } catch (Throwable plError) {
                plLine = "@@ERROR " + plTest + " " + describe(plError);
            }
            System.out.println(plLine);
            System.out.flush();
        }
    }
}
