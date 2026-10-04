// Lesson 04 - defining your own types.
// Fields are private; the outside world goes through methods (encapsulation).

import java.util.ArrayList;
import java.util.List;

public class Main {

    static class Task {
        private final int id;
        private final String title;
        private boolean done;

        Task(int id, String title) {
            this.id = id;
            this.title = title;
        }

        int id() { return id; }
        String title() { return title; }
        boolean isDone() { return done; }
        void markDone() { done = true; }
    }

    static class TaskList {
        private final List<Task> tasks = new ArrayList<>();

        Task add(String title) {
            Task task = new Task(tasks.size() + 1, title);
            tasks.add(task);
            return task;
        }

        boolean complete(int id) {
            for (Task task : tasks) {
                if (task.id() == id) {
                    task.markDone();
                    return true;
                }
            }
            return false;
        }

        long doneCount() {
            return tasks.stream().filter(Task::isDone).count();
        }

        List<Task> tasks() { return tasks; }
    }

    public static void main(String[] args) {
        TaskList todo = new TaskList();
        todo.add("Learn git branching");
        todo.add("Write FizzBuzz in C");
        todo.add("Deploy the site");
        todo.complete(2);

        for (Task task : todo.tasks()) {
            String mark = task.isDone() ? "x" : " ";
            System.out.println("[" + mark + "] " + task.id() + ". " + task.title());
        }
        System.out.println(todo.doneCount() + " of " + todo.tasks().size() + " done");
    }
}
