import { MapPinned } from "lucide-react"


const Navbar = () => {
  return (
    <nav className="w-full flex h-25 bg-neutral-bg items-center border-b border-neutral-800 px-4">
    
            <div className="flex gap-4 items-center">
                <h1 className="text-primary-100 font-semibold text-4xl">TELEMETRY GPS</h1>
                <MapPinned className="text-primary-100" size={32}/>
            </div>

    </nav>
    
  )
}

export default Navbar