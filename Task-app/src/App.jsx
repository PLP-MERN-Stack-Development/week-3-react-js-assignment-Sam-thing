// src/App.jsx
import ApiTasks from "./components/ApiTasks";
import TaskManager from "./components/TaskManager";
import ModeToggle from "./components/ModeToggle";


function App() {
  return (
    <div className="min-h-screen p-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
      <div className="flex justify-end mb-4">
        <ModeToggle />
      </div>
      <TaskManager />
    </div>
  );
}



export default App;
// This App component renders the TaskManager and ApiPosts components side by side in a responsive grid layout.
// It uses Tailwind CSS classes for styling and layout, ensuring a clean and modern design.