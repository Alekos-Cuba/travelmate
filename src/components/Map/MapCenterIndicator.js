import IconProvider from "../../scripts/IconProvider";
import { useDispatch } from "react-redux";
import { useMapEvents } from "react-leaflet";
import { setMapCenter } from "../../redux/actions/mapActions";

const MapCenterIndicator = () => {
  const dispatch = useDispatch();

  const map = useMapEvents({
    moveend() {
      const { lat, lng } = map.getCenter();
      dispatch(setMapCenter({ lat: lat.toFixed(3), lng: lng.toFixed(3) }));
    },
  });

  return (
    <div
      className={`bi ${IconProvider.getIconByName("plus")} z-index-550
      } position-absolute top-50 start-50 translate-middle`}
    ></div>
  );
};

export default MapCenterIndicator;
