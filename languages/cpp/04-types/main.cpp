// Lesson 04 - defining your own types.
// `struct` and `class` are the same thing in C++ except for the default
// access: struct members are public, class members are private.

#include <algorithm>
#include <print>
#include <string>
#include <utility>
#include <vector>

struct Task {
    int id;
    std::string title;
    bool done = false;
};

class TaskList {
public:
    Task& add(std::string title) {
        int id = static_cast<int>(tasks_.size()) + 1;
        // std::move hands the string's buffer over instead of copying it.
        tasks_.push_back(Task{id, std::move(title)});
        return tasks_.back();
    }

    bool complete(int id) {
        auto it = std::ranges::find(tasks_, id, &Task::id);
        if (it == tasks_.end()) return false;
        it->done = true;
        return true;
    }

    // Trailing `const` means this method does not modify the object.
    auto done_count() const { return std::ranges::count(tasks_, true, &Task::done); }

    const std::vector<Task>& tasks() const { return tasks_; }

private:
    std::vector<Task> tasks_;
};

int main() {
    TaskList todo;
    todo.add("Learn git branching");
    todo.add("Write FizzBuzz in C");
    todo.add("Deploy the site");
    todo.complete(2);

    for (const Task& task : todo.tasks()) {
        std::println("[{}] {}. {}", task.done ? 'x' : ' ', task.id, task.title);
    }
    std::println("{} of {} done", todo.done_count(), todo.tasks().size());
}
