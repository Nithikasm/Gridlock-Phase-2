import { useEffect, useRef } from "react";

export default function MapPanel({ setLocation }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!window.mappls) return;

    window.mappls.Map("map", {
      center: [12.9716, 77.5946],
      zoom: 11,
    }, (map) => {

      mapRef.current = map;

      map.on("click", async (event) => {

        const lat = event.latlng.lat;
        const lng = event.latlng.lng;

        if (markerRef.current) {
          markerRef.current.remove();
        }

        markerRef.current = new window.mappls.Marker({
          map,
          position: {
            lat,
            lng,
          },
        });

        let address = "";

        try {
          const response = await fetch(
            `https://apis.mappls.com/advancedmaps/v1/${import.meta.env.VITE_MAPPLS_API_KEY}/rev_geocode?lat=${lat}&lng=${lng}`
          );

          const data = await response.json();

          address =
            data?.results?.[0]?.formatted_address ||
            "";
        } catch (error) {
          console.error(
            "Reverse geocoding failed:",
            error
          );
        }

        setLocation({
          latitude: lat,
          longitude: lng,
          address,
        });
      });
    });
  }, [setLocation]);

  return (
    <div className="bg-white border border-[#D8DEE6] rounded-lg overflow-hidden h-full">

      <div className="px-4 py-3 border-b border-[#D8DEE6]">

        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
          Live Event Location
        </h3>

      </div>

      <div
        id="map"
        className="w-full h-[500px]"
      />
    </div>
  );
}