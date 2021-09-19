import styles from "./../../css/overlayMapCenter.module.css";
import { useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setMapCenter } from "../../redux/actions/mapActions";

const OverlayMapCenter = (props) => {
  const dispatch = useDispatch();
  const mapCenter = useSelector((state) => state.map);

  const map = useMapEvents({
    move() {},
    moveend() {
      const { lat, lng } = map.getCenter();
      dispatch(setMapCenter({ lat: lat.toFixed(3), lng: lng.toFixed(3) }));
    },
  });

  return (
    <div className={`bi bi-plus-lg ${styles.mapCenter}`}>
      <div
        className={styles.mapCenterText}
      >{`[${mapCenter.lat}, ${mapCenter.lng}]`}</div>
    </div>
  );
};

export default OverlayMapCenter;
