import "./App.css";
import { useEffect, useState } from "react";
import Map from "./components/Map";
import MapManager from "./scripts/MapManager";
import Overlay from "./components/Overlay/Overlay";
import DetailsCard from "./components/DetailsCard";
import CountryInfo from "./components/CountryInfoModal/CountryInfo";
import NavBar from "./components/NavBar/NavBar";
import LocationSearchResults from "./components/LocationSearchResults";
import OffcanvasMenu from "./components/LeftMenu/OffcanvasMenu";
import OverlayLoading from "./components/Overlay/OverlayLoading";

function App() {
  const [markers, setMarkers] = useState([]);
  const [showLoadOverlay, setShowLoadOverlay] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [showMapCenter, setShowMapCenter] = useState(false);
  const [markerDetails, setMarkerDetails] = useState({});

  const showMarkerDetails = (markerData) => {
    setMarkerDetails(markerData);
    setShowDetails(true);
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
          setShowMapCenter(true);
          MapManager.enableMapControls();
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <NavBar countryList={markers}></NavBar>
      <OffcanvasMenu
        position="start"
        id="offCanvasLeftMenu"
        title="Find nearby places"
      ></OffcanvasMenu>
      {showLoadOverlay ? (
        <Overlay backgroundColor="rgba(0, 0, 0, 0.7)" fullScreen={true}>
          <OverlayLoading></OverlayLoading>
        </Overlay>
      ) : null}
      {showDetails ? (
        <DetailsCard>
          <CountryInfo
            data={markerDetails}
            onDetailsClose={handleDetailsClose}
          />
        </DetailsCard>
      ) : null}
      <Map
        markers={markers}
        onShowMarkerDetails={showMarkerDetails}
        showMapCenter={showMapCenter}
      ></Map>
    </div>
  );
}

export default App;
