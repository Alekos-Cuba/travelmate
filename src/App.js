import "./App.css";
import ReactDOM from "react-dom";
import defaultFlag from "./resources/images/noflag.png";
import { useEffect, useState } from "react";
import Map from "./components/Map/Map";
import Modal from "./components/Global/Modal";
import CountryInfo from "./components/CountryInfoModal/CountryInfo";
import NavBar from "./components/NavBar/NavBar";
import OffcanvasMenu from "./components/LeftMenu/OffcanvasMenu";
import OffcanvasBodyFindPlaces from "./components/LeftMenu/OffcanvasBodyFindPlaces";
import OverlayLoading from "./components/Overlay/OverlayLoading";
import { setCountries } from "./redux/actions/countryActions";
import { useDispatch } from "react-redux";
import DataProvider from "./scripts/DataProvider";
import APIProvider from "./scripts/APIProvider";
import Backdrop from "./components/Overlay/Backdrop";
import Alert from "./components/Global/Alert";

function App() {
  const dispatch = useDispatch();
  const [showLoadOverlay, setShowLoadOverlay] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [showMapCenter, setShowMapCenter] = useState(false);
  const [markerDetails, setMarkerDetails] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const showMarkerDetails = (markerData) => {
    setMarkerDetails(markerData);
    setShowDetails(true);
  };

  const handleDetailsClose = () => {
    setShowDetails(false);
  };

  const handleAlertDismiss = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    const fetchCountriesData = async () => {
      const countryReqOptions = {
        url: APIProvider.getAPIbyName("countryList"),
      };
      const countryList = localStorage.getItem("countryList")
        ? JSON.parse(localStorage.getItem("countryList"))
        : await DataProvider.getData(countryReqOptions);
      if (!countryList.errorMessage) {
        //save country list into browser cache
        localStorage.setItem("countryList", JSON.stringify(countryList));

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
          setShowLoadOverlay(false);
          setShowMapCenter(true);
          dispatch(setCountries(countriesWithData));
          //save countries info in localStorage
          localStorage.setItem("countries", JSON.stringify(countriesWithData));
        } catch (err) {
          setAlertMessage("There was an error fetching the countries' info");
          setShowAlert(true);
          setShowLoadOverlay(false);
        }
      } else {
        setAlertMessage("Error fetching the list of countries");
        setShowAlert(true);
        setShowLoadOverlay(false);
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
      {showAlert &&
        ReactDOM.createPortal(
          <Alert
            type="danger"
            title="Oops!"
            body={alertMessage}
            onDismiss={handleAlertDismiss}
          />,
          document.getElementById("alerts-root")
        )}
      {ReactDOM.createPortal(
        <NavBar></NavBar>,
        document.getElementById("navbar-root")
      )}
      {ReactDOM.createPortal(
        <OffcanvasMenu
          position="start"
          id="offCanvasLeftMenu"
          title="Find nearby places"
        >
          <OffcanvasBodyFindPlaces></OffcanvasBodyFindPlaces>
        </OffcanvasMenu>,
        document.getElementById("left-menu-root")
      )}
      {showLoadOverlay &&
        ReactDOM.createPortal(
          <Backdrop />,
          document.getElementById("backdrop-root")
        )}
      {showLoadOverlay &&
        ReactDOM.createPortal(
          <OverlayLoading />,
          document.getElementById("overlay-root")
        )}
      {showDetails &&
        ReactDOM.createPortal(
          <Modal top="50" left="50" centerDiv={true}>
            <CountryInfo
              data={markerDetails}
              onDetailsClose={handleDetailsClose}
            />
          </Modal>,
          document.getElementById("modals-root")
        )}
      <Map
        onShowMarkerDetails={showMarkerDetails}
        showMapCenter={showMapCenter}
      ></Map>
    </div>
  );
}

export default App;
