import { DashBoard } from "./components/DashBoard";
import Navbar from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header>
        <Navbar />
      </header>
      <main className="flex-1 grid grid-cols-3 overflow-hidden">
        <Sidebar />
        <DashBoard />
      </main>
    </div>
  );
}

export default App;
