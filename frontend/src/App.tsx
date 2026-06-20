import { DashBoard } from "./components/DashBoard"
import Navbar from "./components/Navbar"
import { Sidebar } from "./components/Sidebar"
import { useVehicles } from "./hooks/useVehicles"

function App() {
  const { vehicles, loading, error, lastUpdate, deleteVehicle } = useVehicles()

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header>
        <Navbar lastUpdate={lastUpdate} />
      </header>
      <main className="flex-1 grid grid-cols-3 overflow-hidden">
        <Sidebar
          vehicles={vehicles}
          loading={loading}
          error={error}
          onDelete={deleteVehicle}
        />
        <DashBoard vehicles={vehicles} />
      </main>
    </div>
  )
}

export default App
