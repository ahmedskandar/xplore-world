import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Chat from "../../components/ui/Chat";

const Map = () => {
  //eslint-disable-next-line
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([0,0]);
  useEffect(() => setMapPosition([51.505, -0.09]), []);
  return (
    <>
      <div className="relative basis-2/3">
        <Chat />
        <MapContainer
          className="relative z-0 h-full"
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
