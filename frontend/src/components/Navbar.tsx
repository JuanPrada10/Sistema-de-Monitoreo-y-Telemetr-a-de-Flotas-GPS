import { MapPinned } from "lucide-react"

interface Props {
  lastUpdate: Date | null
}

const Navbar = ({ lastUpdate }: Props) => {
  const timeStr = lastUpdate
    ? lastUpdate.toLocaleTimeString('es-GT')
    : 'Esperando...'

  return (
    <nav className="w-full flex h-25 bg-neutral-bg items-center border-b border-neutral-800 px-4 justify-between">
      <div className="flex gap-4 items-center">
        <h1 className="text-primary-100 font-semibold text-4xl">TELEMETRY GPS</h1>
        <MapPinned className="text-primary-100" size={32} />
      </div>
      <span className="text-sm text-gray-400">
        Última actualización: {timeStr}
      </span>
    </nav>
  )
}

export default Navbar
