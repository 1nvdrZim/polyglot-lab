// Lesson 04 - defining your own types.
// Properties (`{ get; }`) replace Java's hand-written getter methods.

var todo = new TaskList();
todo.Add("Learn git branching");
todo.Add("Write FizzBuzz in C");
todo.Add("Deploy the site");
todo.Complete(2);

foreach (TodoTask task in todo.Tasks)
{
    string mark = task.Done ? "x" : " ";
    Console.WriteLine($"[{mark}] {task.Id}. {task.Title}");
}
Console.WriteLine($"{todo.DoneCount} of {todo.Tasks.Count} done");

// In a top-level program, type declarations go after the statements.
// Named TodoTask because System.Threading.Tasks.Task is already in scope.
class TodoTask(int id, string title)
{
    public int Id { get; } = id;
    public string Title { get; } = title;
    public bool Done { get; private set; }

    public void MarkDone() => Done = true;
}

class TaskList
{
    private readonly List<TodoTask> tasks = [];

    public IReadOnlyList<TodoTask> Tasks => tasks;

    public int DoneCount => tasks.Count(task => task.Done);

    public TodoTask Add(string title)
    {
        var task = new TodoTask(tasks.Count + 1, title);
        tasks.Add(task);
        return task;
    }

    public bool Complete(int id)
    {
        TodoTask? task = tasks.Find(candidate => candidate.Id == id);
        if (task is null) return false;
        task.MarkDone();
        return true;
    }
}
