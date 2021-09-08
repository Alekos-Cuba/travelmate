import {
  MapConsumer,
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
} from "react-leaflet";
import MapClickHandler from "./MapClickHandler";
import MarkerInfoModal from "./MarkerInfoModal";
import MapManager from "../scripts/MapManager";
import { useState } from "react";

function Map() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [map, setMap] = useState(null);
  const defaultCenter = [38.9072, -77.0369];
  const defaultZoom = 8;

  const mapClickedCallback = (...settings) => {
    let [icon, lat, lng, map] = [...settings];
    setMap(map);
    let mapMarkers = [...markers, { icon, lat, lng }];
    setMarkers(mapMarkers);
    setShowInfoModal(true);
    MapManager.disableMapControls(map);
  };

  const infoModalClosedCallback = (doSave) => {
    if (doSave) {
    } else {
      markers.pop();
      setMarkers(markers);
    }
    MapManager.enableMapControls(map);
    setShowInfoModal(false);
    MapManager.setCurrentState(MapManager.STATES.NONE);
  };

  return (
    <MapContainer center={defaultCenter} zoom={defaultZoom} zoomControl={false}>
      {showInfoModal ? (
        <MarkerInfoModal
          show={showInfoModal}
          map={map}
          onCloseModal={infoModalClosedCallback}
        ></MarkerInfoModal>
      ) : null}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControl position="bottomright" />
      {isFirstLoad ? (
        <MapConsumer>
          {(map) => {
            window.navigator.geolocation.getCurrentPosition(
              (res) => {
                let latitude = res.coords.latitude,
                  longitude = res.coords.longitude;
                map.flyTo({ lat: latitude, lng: longitude }, 8);
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

      <MapClickHandler onMapClicked={mapClickedCallback}></MapClickHandler>
      {markers.map((m) => {
        return (
          <Marker
            key={`marker_${markers.indexOf(m)}`}
            position={[m.lat, m.lng]}
          ></Marker>
        );
      })}
    </MapContainer>
  );
}

export default Map;
