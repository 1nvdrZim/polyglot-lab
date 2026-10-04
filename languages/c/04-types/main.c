// Lesson 04 - defining your own types.
// C has structs but no methods. The convention is free functions that take a
// pointer to the struct as their first argument - `self`/`this` by hand.

#include <stdbool.h>
#include <stdio.h>

#define MAX_TASKS 16

typedef struct {
    int id;
    const char *title;
    bool done;
} Task;

typedef struct {
    Task items[MAX_TASKS];
    int count;
} TaskList;

static Task *task_list_add(TaskList *list, const char *title) {
    if (list->count == MAX_TASKS) return NULL;
    Task *task = &list->items[list->count];
    task->id = list->count + 1;
    task->title = title;
    task->done = false;
    list->count++;
    return task;
}

static bool task_list_complete(TaskList *list, int id) {
    for (int i = 0; i < list->count; i++) {
        if (list->items[i].id == id) {
            list->items[i].done = true;
            return true;
        }
    }
    return false;
}

static int task_list_done_count(const TaskList *list) {
    int done = 0;
    for (int i = 0; i < list->count; i++) {
        if (list->items[i].done) done++;
    }
    return done;
}

int main(void) {
    // {0} zero-initialises every field; without it the struct holds garbage.
    TaskList todo = {0};
    task_list_add(&todo, "Learn git branching");
    task_list_add(&todo, "Write FizzBuzz in C");
    task_list_add(&todo, "Deploy the site");
    task_list_complete(&todo, 2);

    for (int i = 0; i < todo.count; i++) {
        const Task *task = &todo.items[i];
        printf("[%c] %d. %s\n", task->done ? 'x' : ' ', task->id, task->title);
    }
    printf("%d of %d done\n", task_list_done_count(&todo), todo.count);
    return 0;
}
