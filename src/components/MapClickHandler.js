import { useEffect } from "react";
import { useMapEvent } from "react-leaflet";
import MapManager from "../scripts/MapManager";

function MapClickHandler(props) {
  const map = useMapEvent("click", (e) => {
    let { lat, lng } = e.latlng;
    console.log(e.latlng);
    switch (MapManager.getCurrentState()) {
      case MapManager.ACTIONS.ADD_MARKER: {
        MapManager.disableMapControls(map);
        MapManager.setCurrentState(MapManager.ACTIONS.SET_MARKER_INFO);
        props?.onMapClicked(lat, lng);
        break;
      }
      default: {
        break;
      }
    }
  });

  useEffect(() => {
    props.onRender(map);
  }, []);

  return null;
}

export default MapClickHandler;
