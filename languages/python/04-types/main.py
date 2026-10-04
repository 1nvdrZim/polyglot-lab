# Lesson 04 - defining your own types.
# @dataclass writes __init__, __repr__ and __eq__ for you from the fields.

from dataclasses import dataclass, field


@dataclass
class Task:
    id: int
    title: str
    done: bool = False


@dataclass
class TaskList:
    # A mutable default must go through default_factory, otherwise every
    # TaskList would share the same list object.
    tasks: list[Task] = field(default_factory=list)

    def add(self, title: str) -> Task:
        task = Task(id=len(self.tasks) + 1, title=title)
        self.tasks.append(task)
        return task

    def complete(self, task_id: int) -> bool:
        for task in self.tasks:
            if task.id == task_id:
                task.done = True
                return True
        return False

    def done_count(self) -> int:
        return sum(1 for task in self.tasks if task.done)


todo = TaskList()
todo.add("Learn git branching")
todo.add("Write FizzBuzz in C")
todo.add("Deploy the site")
todo.complete(2)

for task in todo.tasks:
    mark = "x" if task.done else " "
    print(f"[{mark}] {task.id}. {task.title}")
print(f"{todo.done_count()} of {len(todo.tasks)} done")
