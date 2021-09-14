import "./../../css/overlayMapCenter.css";
import { useMapEvent } from "react-leaflet";
import { useState } from "react";

const OverlayMapCenter = () => {
  const [mapCenter, setMapCenter] = useState("");
  const map = useMapEvent("move", () => {
    const { lat, lng } = map.getCenter();
    setMapCenter(`[${lat.toFixed(3)}, ${lng.toFixed(3)}]`);
  });
  return (
    <div className="bi bi-plus-lg map-center">
      <div className="map-center-text">{mapCenter}</div>
    </div>
  );
};

export default OverlayMapCenter;
