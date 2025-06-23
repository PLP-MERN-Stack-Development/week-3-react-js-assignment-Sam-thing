import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Trash2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../components/ui/tooltip";


export default function TaskManager() {
  const [localTasks, setLocalTasks] = useLocalStorage("tasks", []);
  const [apiTasks, setApiTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch API tasks
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("https://dummyjson.com/todos?limit=10");
        const data = await res.json();
        setApiTasks(data.todos);
      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchTodos();
  }, []);

  // Add new task (local only)
  const addTask = () => {
    if (!newTask.trim()) return;
    const task = { id: Date.now(), text: newTask, completed: false, source: "local" };
    setLocalTasks([task, ...localTasks]);
    setNewTask("");
  };

  // Toggle completion for local task
  const toggleLocal = (id) => {
    setLocalTasks(
      localTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete local task
  const deleteLocal = (id) => {
    setLocalTasks(localTasks.filter((task) => task.id !== id));
  };

  // Mark API task as completed
  const markApiTaskComplete = (id) => {
    setApiTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  // Delete API task
  const deleteApiTask = (id) => {
    setApiTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Merge tasks
  const allTasks = [
    ...localTasks,
    ...apiTasks.map((t) => ({
      id: t.id,
      text: t.todo,
      completed: t.completed,
      source: "api",
    })),
  ];

  // Filter
  const filteredTasks = allTasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold hover:shadow-lg transition duration-300 ease-in-out">
        My Task Manager
      </h1>

      {/* Add New Task */}
      <div className="flex gap-2">
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:shadow-lg transition duration-300 ease-in-out"
        >
          Add
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded transition duration-200 ${
              filter === f
                ? "bg-primary text-white shadow-lg"
                : "border hover:bg-gray-100 hover:shadow"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

        <TooltipProvider>
    <ul className="space-y-2">
        <AnimatePresence>
        {filteredTasks.map((task) => (
            <motion.li
            key={`${task.source}-${task.id}`}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center justify-between p-3 border rounded transition duration-200 ${
                task.completed ? "line-through text-muted-foreground" : ""
            } hover:shadow-lg`}
            >
            {/* 📝 Task Text */}
            <span
                onClick={() =>
                task.source === "local" ? toggleLocal(task.id) : null
                }
                className="cursor-pointer flex-1"
            >
                {task.text}
                {task.source === "api" && (
                <span className="text-xs text-blue-400 ml-2">(API)</span>
                )}
            </span>

            {/* 🎯 Action Buttons */}
            <div className="flex gap-2">
                {!task.completed && (
                <Tooltip>
                    <TooltipTrigger asChild>
                    <button
                        onClick={() =>
                        task.source === "local"
                            ? toggleLocal(task.id)
                            : markApiTaskComplete(task.id)
                        }
                        className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                        <Check className="w-4 h-4" />
                    </button>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p>Mark as Done</p>
                    </TooltipContent>
                </Tooltip>
                )}

                <Tooltip>
                <TooltipTrigger asChild>
                    <button
                    onClick={() =>
                        task.source === "local"
                        ? deleteLocal(task.id)
                        : deleteApiTask(task.id)
                    }
                    className="p-2 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                    <Trash2 className="w-4 h-4" />
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete Task</p>
                </TooltipContent>
                </Tooltip>
            </div>
            </motion.li>
        ))}
        </AnimatePresence>
    </ul>
    </TooltipProvider>

    </div>
  );
}
