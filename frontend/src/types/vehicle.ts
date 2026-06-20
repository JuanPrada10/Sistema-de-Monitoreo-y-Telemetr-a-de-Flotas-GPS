export interface Vehicle {
  vehicle_id: string
  last_lat: number | null
  last_lng: number | null
  last_seen: string | null
  status: 'En movimiento' | 'Detenido' | 'Sin señal'
}
