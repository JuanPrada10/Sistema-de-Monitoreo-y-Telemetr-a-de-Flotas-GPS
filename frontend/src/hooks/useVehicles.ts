import { useEffect, useState } from 'react'
import type { Vehicle } from '../types/vehicle'

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  async function fetchVehicles() {
    try {
      const res = await fetch('/api/vehicles')
      if (!res.ok) throw new Error(`Error ${res.status}`)
      const data = await res.json()
      setVehicles(data)
      setLastUpdate(new Date())
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  async function deleteVehicle(id: string) {
    try {
      const res = await fetch(`/api/vehicles/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(`Error ${res.status}`)
      setVehicles(prev => prev.filter(v => v.vehicle_id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar')
    }
  }

  useEffect(() => {
    fetchVehicles()
    const interval = setInterval(fetchVehicles, 5000)
    return () => clearInterval(interval)
  }, [])

  return { vehicles, loading, error, lastUpdate, deleteVehicle }
}
