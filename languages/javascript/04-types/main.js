// Lesson 04 - defining your own types.
// Fields and parameters carry no declared types. Compare this with the Java
// and C# versions, where every one of them has to be spelled out.

class Task {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.done = false;
  }
}

class TaskList {
  // A leading # makes the field private: code outside the class cannot reach it.
  #tasks = [];

  add(title) {
    const task = new Task(this.#tasks.length + 1, title);
    this.#tasks.push(task);
    return task;
  }

  complete(id) {
    const task = this.#tasks.find((candidate) => candidate.id === id);
    if (!task) return false;
    task.done = true;
    return true;
  }

  get doneCount() {
    return this.#tasks.filter((task) => task.done).length;
  }

  get tasks() {
    return this.#tasks;
  }
}

const todo = new TaskList();
todo.add('Learn git branching');
todo.add('Write FizzBuzz in C');
todo.add('Deploy the site');
todo.complete(2);

for (const task of todo.tasks) {
  const mark = task.done ? 'x' : ' ';
  console.log(`[${mark}] ${task.id}. ${task.title}`);
}
console.log(`${todo.doneCount} of ${todo.tasks.length} done`);
