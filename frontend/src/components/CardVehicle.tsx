import { Timer, Trash2 } from "lucide-react"
import type { Vehicle } from "../types/vehicle"

const statusStyles = {
  'En movimiento': 'border-emerald-400 bg-emerald-400/20 text-emerald-400',
  'Detenido': 'border-yellow-400 bg-yellow-400/20 text-yellow-400',
  'Sin señal': 'border-red-400 bg-red-400/20 text-red-400',
}

interface Props {
  vehicle: Vehicle
  onDelete: (id: string) => void
}

export const CardVehicle = ({ vehicle, onDelete }: Props) => {
  const timeStr = vehicle.last_seen
    ? new Date(vehicle.last_seen).toLocaleTimeString('es-GT')
    : '--:--:--'

  return (
    <div className="bg-secondary rounded-2xl border border-primary-100/50 w-full p-4 flex-col relative flex gap-4 shadow-md shadow-primary-100/30">
      <div>
        <span className="text-sm text-emerald-700 font-semibold">UNIT ID</span>
        <h3 className="text-xl font-semibold">{vehicle.vehicle_id}</h3>
      </div>
      <span className={`text-xs absolute top-4 right-4 border rounded-md px-2 ${statusStyles[vehicle.status]}`}>
        {vehicle.status.toUpperCase()}
      </span>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <Timer size={16} />
          <span className="text-sm">{timeStr}</span>
        </div>
        <button
          onClick={() => onDelete(vehicle.vehicle_id)}
          className="text-red-400 hover:text-red-300 transition-colors"
          title="Eliminar vehículo"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}
