import { useMapEvent } from "react-leaflet";
import MapManager from "../scripts/MapManager";
import L from "leaflet";

function MapClickHandler(props) {
  const map = useMapEvent("click", (e) => {
    let { lat, lng } = e.latlng;
    let icon;
    switch (MapManager.getCurrentState()) {
      case MapManager.STATES.ADD_MARKER: {
        let marker = new L.Marker([lat, lng]);
        marker.addTo(map);
        icon = MapManager.ICON_TYPES.get("MARKER");
        MapManager.setCurrentState(MapManager.STATES.NONE);
        break;
      }
      default: {
        break;
      }
    }
    props?.onMapClicked(icon);
  });
  return null;
}

export default MapClickHandler;
