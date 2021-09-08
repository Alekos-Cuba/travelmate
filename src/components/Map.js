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

  const mapWasClicked = (...settings) => {
    let [icon, lat, lng, map] = [...settings];
    setMap(map);
    MapManager.disableMapControls(map);
    let mapMarkers = [...markers, { icon, lat, lng }];
    setMarkers(mapMarkers);
    setShowInfoModal(true);
  };

  const handleModalClose = () => {
    MapManager.enableMapControls(map);
    setShowInfoModal(false);
  };

  return (
    <MapContainer center={defaultCenter} zoom={defaultZoom} zoomControl={false}>
      <MarkerInfoModal
        show={showInfoModal}
        map={map}
        onCloseModal={handleModalClose}
      ></MarkerInfoModal>
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
      ) : (
        ""
      )}

      <MapClickHandler onMapClicked={mapWasClicked}></MapClickHandler>
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
