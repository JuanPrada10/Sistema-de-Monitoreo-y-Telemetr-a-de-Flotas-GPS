import { Timer } from "lucide-react"


export const CardVehicle = () => {
  return (
    <div className="bg-secondary rounded-2xl border border-primary-100/50 w-full p-4 flex-col relative flex  gap-4 shadow-md shadow-primary-100/30">
        <div>
          <span className="text-sm text-emerald-700 font-semibold">UNIT ID</span>
          <h3 className="text-xl font-semibold">VH-001</h3>
        </div>
        <span className="text-sm absolute top-4 right-4 border border-primary-100 bg-primary-100/20 rounded-md px-2 text-primary-100">EN MOVIMIENTO</span>
        <div className="flex items-center gap-2 text-gray-600">
        <Timer size={16} />
        <span className="text-sm">10:00:5 AM</span>
        </div>
      </div>
  )
}
