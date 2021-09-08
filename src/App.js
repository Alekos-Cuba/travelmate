import "./App.css";
import {
  MapConsumer,
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  Popup,
} from "react-leaflet";
import NavBar from "./components/NavBar";
import MapClickHandler from "./components/MapClickHandler";
import { useState } from "react";

function App() {
  const [markers, setMarkers] = useState([]);
  const defaultCenter = [38.9072, -77.0369];
  const defaultZoom = 8;

  const mapWasClicked = (...settings) => {
    let [icon, lat, lng] = [...settings];
    let mapMarkers = [...markers, { icon, lat, lng }];
    setMarkers(mapMarkers);
  };

  return (
    <div className="App">
      <NavBar></NavBar>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="bottomright" />
        <MapConsumer>
          {(map) => {
            window.navigator.geolocation.getCurrentPosition(
              (res) => {
                let latitude = res.coords.latitude,
                  longitude = res.coords.longitude;
                map.flyTo({ lat: latitude, lng: longitude }, 8);
              },
              (err) => {
                alert("Failed to retrieve geolocation");
              }
            );
            return null;
          }}
        </MapConsumer>
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
    </div>
  );
}

export default App;
