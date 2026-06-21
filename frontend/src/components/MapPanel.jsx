import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { getNearestPoliceStation } from "../services/api";

function LocationMarker({ setLocation }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;

      setPosition([lat, lng]);

      try {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
  );

  const data = await response.json();

const policeResponse =
  await getNearestPoliceStation(lat, lng);
console.log(
  "Police Station:",
  policeResponse.data.police_station
);
setLocation({
  latitude: lat,
  longitude: lng,
  address: data.display_name || "",
  police_station:
    policeResponse.data.police_station,
});
} catch (error) {
  console.error("Reverse geocoding failed:", error);

  setLocation({
    latitude: lat,
    longitude: lng,
    address: "",
  });
}

    
        },
      });

  return position ? <Marker position={position} /> : null;
}

export default function MapPanel({ setLocation }) {
  return (
    <div className="bg-white rounded-lg border border-gray-300 p-4">
      <h2 className="text-lg font-semibold mb-4">
        LIVE EVENT LOCATION
      </h2>

      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={11}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker setLocation={setLocation} />
      </MapContainer>
    </div>
  );
}