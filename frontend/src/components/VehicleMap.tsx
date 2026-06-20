import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export const VehicleMap = () => {
  return (
    <div className="h-140 w-220 rounded-xl overflow-hidden">
      <MapContainer
        center={[14.6349, -90.5069]}
        zoom={12}
        scrollWheelZoom={false}
        className="h-full w-ful"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[14.6349, -90.5069]}>
          <Popup>Ubicación de prueba</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
