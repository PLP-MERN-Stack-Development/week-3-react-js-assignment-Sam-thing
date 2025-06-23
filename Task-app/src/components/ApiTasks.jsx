import { useEffect, useState } from "react";

export default function ApiTasks() {
  const [apiTasks, setApiTasks] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("https://dummyjson.com/todos");
        const data = await res.json();
        setApiTasks(data.todos);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTodos();
  }, []);
  
  // Add new user task
  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const newEntry = {
      id: Date.now(),
      todo: newTask,
      completed: false,
      userCreated: true,
    };

    setUserTasks([newEntry, ...userTasks]);
    setNewTask("");
  };

  // Combine both lists
  const allTasks = [...userTasks, ...apiTasks];

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold"> Hybrid Task List</h2>

      {/* Input Section */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={handleAddTask}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-2">
        {allTasks.map((task) => (
          <li
            key={task.id}
            className={`p-3 rounded border ${
              task.completed
                ? "line-through text-muted-foreground bg-green-100"
                : "bg-white dark:bg-zinc-800"
            }`}
          >
            {task.todo}
            {task.userCreated && (
              <span className="ml-2 text-xs text-blue-500">(new)</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
