import {
  MapConsumer,
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  LayerGroup,
  Popup,
} from "react-leaflet";
import MapClickHandler from "./MapClickHandler";
import MarkerInfoModal from "./MarkerInfoModal";
import MapManager from "../scripts/MapManager";
import { useEffect, useState } from "react";
import axios from "axios";

function Map() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [map, setMap] = useState(null);
  const [clickCoords, setClickCoords] = useState([]);
  const defaultCenter = [38.9072, -77.0369];
  const defaultZoom = 8;

  const mapClickedCallback = (...settings) => {
    let [lat, lng] = [...settings];
    setClickCoords([lat, lng]);
    setShowInfoModal(true);
  };

  const infoModalClosedCallback = (...modalResponse) => {
    let [doSave, markerData] = modalResponse;
    if (doSave) {
      axios
        .post("http://localhost:5000/poi", markerData)
        .then((res) => {
          if (res.status === 201) {
            setMarkers([...markers, res.data]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    MapManager.enableMapControls(map);
    setShowInfoModal(false);
    MapManager.setCurrentAction(MapManager.ACTIONS.NONE);
  };

  const getMapAccessor = (map) => {
    setMap(map);
    MapManager.setMap(map);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/poi").then((res) => {
      if (res.status === 200) {
        setMarkers(res.data);
      }
    });
  }, []);

  return (
    <MapContainer center={defaultCenter} zoom={defaultZoom} zoomControl={false}>
      {showInfoModal ? (
        <MarkerInfoModal
          show={showInfoModal}
          map={map}
          markerCoords={clickCoords}
          onCloseModal={infoModalClosedCallback}
        ></MarkerInfoModal>
      ) : null}
      <LayerGroup>
        {markers.map((m) => {
          return (
            <Marker key={m._id} position={[m.coords.lat, m.coords.lng]}>
              <Popup>{m.description}</Popup>
            </Marker>
          );
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

      <MapClickHandler
        onMapClicked={mapClickedCallback}
        onRender={getMapAccessor}
      ></MapClickHandler>
    </MapContainer>
  );
}

export default Map;
