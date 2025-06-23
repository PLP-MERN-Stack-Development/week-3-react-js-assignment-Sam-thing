import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle"; // light/dark toggle if you have one

export default function Navbar() {
  return (
    <header className="w-full border-b sticky top-0 z-50 bg-background">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          TaskMaster ✅
        </Link>
        <nav className="space-x-4">
          <Link to="/tasks" className="hover:underline text-muted-foreground">
            Tasks
          </Link>
          <Link to="/about" className="hover:underline text-muted-foreground">
            About
          </Link>
        </nav>
        <ModeToggle />
      </div>
    </header>
  );
}
