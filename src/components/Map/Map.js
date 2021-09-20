import {
  MapConsumer,
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  LayerGroup,
  Popup,
} from "react-leaflet";
import MapManager from "../../scripts/MapManager";
import { useState } from "react";
import MarkerPopupInfo from "../MarkerPopupInfo";
import UID from "../../scripts/IdGenerator";
import Overlay from "../Overlay/Overlay";
import OverlayMapCenter from "../Overlay/OverlayMapCenter";
import { useDispatch, useSelector } from "react-redux";
import { setMapCenter } from "../../redux/actions/mapActions";

function Map(props) {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const defaultCenter = [38.9072, -77.0369];
  const defaultZoom = 6;

  const setMapAccessor = (map) => {
    MapManager.setMap(map);
    MapManager.disableMapControls();
  };

  return (
    <MapContainer center={defaultCenter} zoom={defaultZoom} zoomControl={false}>
      {props.showMapCenter ? (
        <Overlay>
          <OverlayMapCenter />
        </Overlay>
      ) : null}
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
            setMapAccessor(map);
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
      ) : null}
    </MapContainer>
  );
}

export default Map;
