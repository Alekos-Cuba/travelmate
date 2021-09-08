import { useMapEvent } from "react-leaflet";
import MapManager from "../scripts/MapManager";

function MapClickHandler(props) {
  const map = useMapEvent("click", (e) => {
    let { lat, lng } = e.latlng;
    let icon;
    switch (MapManager.getCurrentState()) {
      case MapManager.STATES.ADD_MARKER: {
        icon = MapManager.ICON_TYPES.get("MARKER");
        MapManager.setCurrentState(MapManager.STATES.NONE);
        props?.onMapClicked(icon, lat, lng, map);
        break;
      }
      default: {
        break;
      }
    }
  });
  return null;
}

export default MapClickHandler;
