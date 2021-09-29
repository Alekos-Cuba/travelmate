import {
  MapConsumer,
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  LayerGroup,
  Popup,
  GeoJSON,
} from "react-leaflet";
import ReactDOM from "react-dom";
import MapManager from "../../scripts/MapManager";
import { useState } from "react";
import MarkerPopupInfo from "../MarkerPopupInfo";
import UID from "../../scripts/IdGenerator";
import { useDispatch, useSelector } from "react-redux";
import { setMapCenter } from "../../redux/actions/mapActions";
import APIProvider from "../../scripts/APIProvider";
import MapCenterIndicator from "./MapCenterIndicator";
import Modal from "../Global/Modal";
import MapCenterCoordinates from "./MapCenterCoordinates";

function Map({ showMapCenter, onShowMarkerDetails }) {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const countryBoundary = useSelector((state) => state.boundary);
  const nearbyPlaces = useSelector((state) => state.nearbyPlaces);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const defaultCenter = [38.9072, -77.0369];
  const defaultZoom = 6;

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      zoomControl={false}
      whenCreated={(map) => {
        MapManager.setMap(map);
      }}
    >
      {showMapCenter &&
        ReactDOM.createPortal(
          <MapCenterIndicator />,
          document.getElementById("overlay-root")
        )}
      {showMapCenter &&
        ReactDOM.createPortal(
          <Modal bottom="0" left="0" centerDiv={false}>
            <MapCenterCoordinates />
          </Modal>,
          document.getElementById("modals-root")
        )}
      <LayerGroup>
        {countries.map((markerData) => {
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
                    onShowDetails={onShowMarkerDetails}
                  ></MarkerPopupInfo>
                </Popup>
              </Marker>
            );
          }
          return {};
        })}
      </LayerGroup>
      <LayerGroup>
        {nearbyPlaces.map((place) => {
          return (
            <Marker
              title={place.name}
              key={place.id}
              position={[place.location.lat, place.location.lng]}
            >
              <Popup>{place.name}</Popup>
            </Marker>
          );
        })}
      </LayerGroup>
      {countryBoundary.map((boundary) => {
        return (
          <GeoJSON key={UID.next().value} data={boundary.geojson}>
            <Popup>{boundary.display_name}</Popup>
          </GeoJSON>
        );
      })}
      <TileLayer
        url={APIProvider.getAPIbyName("mapTiles")}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControl position="bottomright" />
      {isFirstLoad && (
        <MapConsumer>
          {(map) => {
            window.navigator.geolocation.getCurrentPosition(
              (res) => {
                let latitude = res.coords.latitude,
                  longitude = res.coords.longitude;
                map.setView({ lat: latitude, lng: longitude }, defaultZoom);
                setIsFirstLoad(false);
                dispatch(
                  setMapCenter({
                    lat: latitude.toFixed(3),
                    lng: longitude.toFixed(3),
                  })
                );
              },
              (err) => {
                setIsFirstLoad(false);
                dispatch(
                  setMapCenter({ lat: defaultCenter[0], lng: defaultCenter[1] })
                );
              }
            );
            return null;
          }}
        </MapConsumer>
      )}
    </MapContainer>
  );
}

export default Map;
