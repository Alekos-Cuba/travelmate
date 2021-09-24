import "./App.css";
import defaultFlag from "./resources/images/noflag.png";
import { useEffect, useState } from "react";
import Map from "./components/Map/Map";
import MapManager from "./scripts/MapManager";
import Overlay from "./components/Overlay/Overlay";
import DetailsCard from "./components/Global/DetailsCard";
import CountryInfo from "./components/CountryInfoModal/CountryInfo";
import NavBar from "./components/NavBar/NavBar";
import OffcanvasMenu from "./components/LeftMenu/OffcanvasMenu";
import OffcanvasBodyFindPlaces from "./components/LeftMenu/OffcanvasBodyFindPlaces";
import OverlayLoading from "./components/Overlay/OverlayLoading";
import { setCountries } from "./redux/actions/countryActions";
import { useDispatch } from "react-redux";
import DataProvider from "./scripts/DataProvider";

function App() {
  const url = window.location.origin;
  if (!url.includes("localhost") && !url.includes("https")) {
    window.location = `https:${url.split(":")[1]}`;
  }

  const dispatch = useDispatch();
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
    const fetchCountriesData = async () => {
      const countryReqOptions = {
        url: "https://travelbriefing.org/countries.json",
      };
      const countryList = await DataProvider.getData(countryReqOptions);
      if (!countryList.errorMessage) {
        const countryPromises = [];
        countryList.forEach((countryData) => {
          const countryInfoReqOptions = {
            url: countryData.url,
          };
          countryPromises.push(DataProvider.getData(countryInfoReqOptions));
        });
        try {
          const countriesInfoFromURL = await Promise.allSettled(
            countryPromises
          );
          let countriesWithData = countriesInfoFromURL.map((countryInfo) => {
            let flagUrl = countryInfo.value.names.iso2
              ? `https://www.countryflags.io/${countryInfo.value.names.iso2}/shiny/32.png`
              : defaultFlag;
            return {
              ...countryInfo.value,
              flag: flagUrl,
            };
          });
          console.log(countriesWithData);
          setShowLoadOverlay(false);
          setShowMapCenter(true);
          dispatch(setCountries(countriesWithData));
          //save countries info in localStorage
          localStorage.setItem("countries", JSON.stringify(countriesWithData));
        } catch (err) {
          console.log(err.errorMessage);
        }
      }
    };

    //search for countries info in localStorage first
    if (localStorage.getItem("countries") !== null) {
      dispatch(setCountries(JSON.parse(localStorage.getItem("countries"))));
      setShowLoadOverlay(false);
      setShowMapCenter(true);
    } else {
      fetchCountriesData();
    }
  }, [dispatch]);

  return (
    <div className="App">
      <NavBar></NavBar>
      <OffcanvasMenu
        position="start"
        id="offCanvasLeftMenu"
        title="Find nearby places"
      >
        <OffcanvasBodyFindPlaces></OffcanvasBodyFindPlaces>
      </OffcanvasMenu>
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
        onShowMarkerDetails={showMarkerDetails}
        showMapCenter={showMapCenter}
      ></Map>
    </div>
  );
}

export default App;
