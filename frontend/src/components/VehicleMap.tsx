import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import type { Vehicle } from "../types/vehicle";

const iconUrls = {
  "En movimiento":
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  Detenido:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  "Sin señal":
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
};

function createIcon(status: string) {
  const url =
    (iconUrls as Record<string, string>)[status] || iconUrls["Sin señal"];
  return L.icon({
    iconUrl: url,
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
}

interface Props {
  vehicles: Vehicle[];
}

export const VehicleMap = ({ vehicles }: Props) => {
  const withCoords = vehicles.filter(
    (v) => v.last_lat != null && v.last_lng != null,
  );
  const center: [number, number] = [4.7110, -74.0721];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {withCoords.map((v) => (
          <Marker
            key={v.vehicle_id}
            position={[v.last_lat!, v.last_lng!]}
            icon={createIcon(v.status)}
          >
            <Popup>
              <strong>{v.vehicle_id}</strong>
              <br />
              Estado: {v.status}
              {v.last_seen && (
                <>
                  <br />
                  Última vez:{" "}
                  {new Date(v.last_seen).toLocaleTimeString("es-GT")}
                </>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
