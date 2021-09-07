import "./App.css";
import {
  MapConsumer,
  MapContainer,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import NavBar from "./components/NavBar";

function App() {
  const defaultCenter = [38.9072, -77.0369];
  const defaultZoom = 8;

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
      </MapContainer>
    </div>
  );
}

export default App;
