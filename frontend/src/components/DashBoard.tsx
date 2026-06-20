import { VehicleMap } from "./VehicleMap"
import type { Vehicle } from "../types/vehicle"

interface Props {
  vehicles: Vehicle[]
}

export const DashBoard = ({ vehicles }: Props) => {
  return (
    <section className="w-full h-full bg-secondary col-span-2 flex justify-center items-center">
      <VehicleMap vehicles={vehicles} />
    </section>
  )
}
