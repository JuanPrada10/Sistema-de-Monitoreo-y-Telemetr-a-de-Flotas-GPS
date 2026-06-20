import { CardVehicle } from "./CardVehicle"
import type { Vehicle } from "../types/vehicle"

interface Props {
  vehicles: Vehicle[]
  loading: boolean
  error: string | null
  onDelete: (id: string) => void
}

export const Sidebar = ({ vehicles, loading, error, onDelete }: Props) => {
  return (
    <aside className="h-full bg-neutral-bg flex flex-col items-center px-6">
      <h2 className="text-emerald-800 font-semibold text-3xl my-12 bg-primary-100 rounded px-3 py-2 w-full text-center">
        Vehiculos
      </h2>
      <div className="flex flex-col gap-4 w-full overflow-y-auto flex-1 pb-4">
        {loading && <p className="text-gray-400 text-center">Cargando...</p>}
        {error && <p className="text-red-400 text-center">{error}</p>}
        {!loading && !error && vehicles.length === 0 && (
          <p className="text-gray-400 text-center">Sin vehículos</p>
        )}
        {vehicles.map(v => (
          <CardVehicle key={v.vehicle_id} vehicle={v} onDelete={onDelete} />
        ))}
      </div>
    </aside>
  )
}
