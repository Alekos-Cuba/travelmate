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
import LoadingOverlay from "./LoadingOverlay";

function Map() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showLoadOverlay, setShowLoadOverlay] = useState(true);
  const [map, setMap] = useState(null);
  const [clickCoords, setClickCoords] = useState([]);
  const defaultCenter = [38.9072, -77.0369];
  const defaultZoom = 4;

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
    MapManager.disableMapControls();
  };

  useEffect(() => {
    const countryListPromise = MapManager.getCountries();
    countryListPromise.then((res) => {
      if (!res.errorMessage) {
        const countryPromises = [];
        const data = res.data;
        data.forEach((countryData) => {
          countryPromises.push(MapManager.getCountryInfo(countryData.url));
        });
        Promise.all(countryPromises).then((values) => {
          const mapMarkers = [];
          values.forEach((countryInfo) => {
            mapMarkers.push(countryInfo.data);
          });
          console.log(mapMarkers);
          setMarkers(mapMarkers);
          setShowLoadOverlay(false);
          MapManager.enableMapControls();
        });
      }
    });
  }, []);

  return (
    <MapContainer center={defaultCenter} zoom={defaultZoom} zoomControl={false}>
      {showLoadOverlay ? <LoadingOverlay></LoadingOverlay> : null}
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
            <Marker
              key={`${m.names.continent}_${m.names.name}`}
              position={[m.maps.lat, m.maps.long]}
            >
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
            getMapAccessor(map);
            window.navigator.geolocation.getCurrentPosition(
              (res) => {
                let latitude = res.coords.latitude,
                  longitude = res.coords.longitude;
                map.flyTo({ lat: latitude, lng: longitude }, 4);
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
    </MapContainer>
  );
}

export default Map;
