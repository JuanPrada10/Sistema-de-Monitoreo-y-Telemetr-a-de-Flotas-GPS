import { CardVehicle } from "./CardVehicle"

export const Sidebar = () => {
  return (
  
    <aside className="h-full bg-neutral-bg flex flex-col items-center px-6">
      <h2 className="text-emerald-800 font-semibold text-3xl my-12 bg-primary-100 rounded px-3 py-2 w-full text-center" >Vehiculos</h2>
     <CardVehicle/>
    </aside>
  )
}
