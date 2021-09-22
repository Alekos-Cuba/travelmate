import styles from "./../../css/overlayMapCenter.module.css";
import { useState } from "react";
import { useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setMapCenter } from "../../redux/actions/mapActions";

const OverlayMapCenter = () => {
  const dispatch = useDispatch();
  const mapCenter = useSelector((state) => state.mapCenter);
  const [centerCoords, setCenterCoords] = useState(mapCenter);

  const map = useMapEvents({
    move() {
      const { lat, lng } = map.getCenter();
      setCenterCoords({ lat: lat.toFixed(3), lng: lng.toFixed(3) });
    },
    moveend() {
      const { lat, lng } = map.getCenter();
      dispatch(setMapCenter({ lat: lat.toFixed(3), lng: lng.toFixed(3) }));
    },
  });

  return (
    <div className={`bi bi-plus-lg ${styles.mapCenter}`}>
      <div
        className={styles.mapCenterText}
      >{`[${centerCoords.lat}, ${centerCoords.lng}]`}</div>
    </div>
  );
};

export default OverlayMapCenter;
