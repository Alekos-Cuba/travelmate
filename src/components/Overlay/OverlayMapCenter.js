import styles from "./../../css/overlayMapCenter.module.css";
import { useMapEvent } from "react-leaflet";
import { useState } from "react";

const OverlayMapCenter = (props) => {
  const [mapCenter, setMapCenter] = useState("");

  const map = useMapEvent("move", () => {
    const { lat, lng } = map.getCenter();
    setMapCenter(`[${lat.toFixed(3)}, ${lng.toFixed(3)}]`);
  });

  return (
    <div className={`bi bi-plus-lg ${styles.mapCenter}`}>
      <div className={styles.mapCenterText}>{mapCenter}</div>
    </div>
  );
};

export default OverlayMapCenter;
