// Lesson 03 - a hash map and sorting with a comparator.
// Collections hold objects, so the map uses Integer (boxed), not int.

import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

public class Main {

    public static void main(String[] args) {
        String text = "the quick brown fox jumps over the lazy dog the fox";

        Map<String, Integer> counts = new HashMap<>();
        for (String word : text.split(" ")) {
            // merge: insert 1, or combine the existing value with 1 using sum.
            counts.merge(word, 1, Integer::sum);
        }

        // Sort by count descending, then word ascending.
        counts.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue(Comparator.reverseOrder())
                        .thenComparing(Map.Entry.comparingByKey()))
                .forEach(entry -> System.out.println(entry.getKey() + ": " + entry.getValue()));
    }
}
