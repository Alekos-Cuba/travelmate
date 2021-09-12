import "./App.css";
import { useEffect, useState } from "react";
import Map from "./components/Map";
import MapManager from "./scripts/MapManager";
import LoadingOverlay from "./components/LoadingOverlay";
import DetailsCard from "./components/DetailsCard";
import CountryInfo from "./components/CountryInfo";
import NavBar from "./components/NavBar";
import LocationSearchResults from "./components/LocationSearchResults";

function App() {
  const [markers, setMarkers] = useState([]);
  const [showLoadOverlay, setShowLoadOverlay] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [markerDetails, setMarkerDetails] = useState({});
  const [searchLocations, setSearchLocations] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const handleSearchResultClose = () => {
    setShowSearchResults(false);
  };

  const showMarkerDetails = (markerData) => {
    setMarkerDetails(markerData);
    setShowDetails(true);
  };

  const handleLocationResults = (locations) => {
    setSearchLocations(locations);
    setShowSearchResults(true);
  };

  const handleDetailsClose = () => {
    setShowDetails(false);
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
    <div className="App">
      <NavBar
        countryList={markers}
        onLocationFound={handleLocationResults}
      ></NavBar>
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
      <Map markers={markers} onShowMarkerDetails={showMarkerDetails}></Map>
    </div>
  );
}

export default App;
