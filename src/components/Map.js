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
import LoadingOverlay from "./LoadingOverlay";
import MarkerPopupInfo from "./MarkerPopupInfo";
import DetailsCard from "./DetailsCard";
import CountryInfo from "./CountryInfo";
import UID from "../scripts/IdGenerator";
import NavBar from "./../components/NavBar";
import LocationSearchResults from "./LocationSearchResults";

function Map() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [showLoadOverlay, setShowLoadOverlay] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchLocations, setSearchLocations] = useState([]);
  const [markerDetails, setMarkerDetails] = useState({});
  const defaultCenter = [38.9072, -77.0369];
  const defaultZoom = 6;

  const showMarkerDetails = (markerData) => {
    setMarkerDetails(markerData);
    setShowDetails(true);
  };

  const handleDetailsClose = () => {
    setShowDetails(false);
  };

  const handleLocationResults = (locations) => {
    setSearchLocations(locations);
    setShowSearchResults(true);
  };

  const handleSearchResultClose = () => {
    setShowSearchResults(false);
  };

  const getMapAccessor = (map) => {
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
      {showDetails ? (
        <DetailsCard>
          <CountryInfo
            data={markerDetails}
            onDetailsClose={handleDetailsClose}
          />
        </DetailsCard>
      ) : null}
      {showSearchResults ? (
        <DetailsCard>
          <LocationSearchResults
            locations={searchLocations}
            onCloseSearchResults={handleSearchResultClose}
          ></LocationSearchResults>
        </DetailsCard>
      ) : null}
      <LayerGroup>
        {markers.map((markerData) => {
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
                    onShowDetails={showMarkerDetails}
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
      <NavBar
        countryList={markers}
        onLocationFound={handleLocationResults}
      ></NavBar>
    </MapContainer>
  );
}

export default Map;
