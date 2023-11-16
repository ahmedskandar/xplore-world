import { LatLngExpression } from "leaflet";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Chat from "../../components/ui/Chat";

const Map = () => {
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([
    51.505, -0.09,
  ]);
  return (
    <>
    <div className="basis-2/3 relative">
      <Chat />
      <MapContainer
        className="h-full z-0 relative"
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
    </>
  );
};

export default Map;
