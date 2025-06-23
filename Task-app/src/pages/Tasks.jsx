import TaskManager from "@/components/TaskManager"; // alias setup in vite.config.js
// or relative path like: ../components/TaskManager

export default function TasksPage() {
  return (
    <div className="p-4">
      <TaskManager />
    </div>
  );
}
// This page imports the TaskManager component and renders it within a div with padding.