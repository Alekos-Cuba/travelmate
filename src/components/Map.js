import {
  MapConsumer,
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  LayerGroup,
  Popup,
} from "react-leaflet";
import MapManager from "../scripts/MapManager";
import { useEffect, useState } from "react";
import MarkerPopupInfo from "./MarkerPopupInfo";
import UID from "../scripts/IdGenerator";

function Map(props) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const defaultCenter = [38.9072, -77.0369];
  const defaultZoom = 6;

  const getMapAccessor = (map) => {
    MapManager.setMap(map);
    MapManager.disableMapControls();
  };

  useEffect(() => {}, []);

  return (
    <MapContainer center={defaultCenter} zoom={defaultZoom} zoomControl={false}>
      <LayerGroup>
        {props.markers.map((markerData) => {
          if (markerData) {
            return (
              <Marker
                title={markerData.names.name}
                key={UID.next().value}
                position={[markerData.maps.lat, markerData.maps.long]}
              >
                <Popup>
                  <MarkerPopupInfo
                    data={markerData}
                    onShowDetails={props.onShowMarkerDetails}
                  ></MarkerPopupInfo>
                </Popup>
              </Marker>
            );
          }
          return {};
        })}
      </LayerGroup>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControl position="bottomright" />
      {isFirstLoad ? (
        <MapConsumer>
          {(map) => {
            getMapAccessor(map);
            window.navigator.geolocation.getCurrentPosition(
              (res) => {
                let latitude = res.coords.latitude,
                  longitude = res.coords.longitude;
                map.flyTo({ lat: latitude, lng: longitude }, defaultZoom);
                setIsFirstLoad(false);
              },
              (err) => {
                alert("Failed to retrieve geolocation");
                setIsFirstLoad(false);
              }
            );
            return null;
          }}
        </MapConsumer>
      ) : null}
    </MapContainer>
  );
}

export default Map;
