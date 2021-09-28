import DropdownMenu from "../Dropdown/DropdownMenu";
import NavBarActionButton from "./NavBarActionButton";
import ActionButton from "../Global/ActionButton";
import IconProvider from "../../scripts/IconProvider";
import APIProvider from "./../../scripts/APIProvider";
import { useSelector } from "react-redux";
import DataProvider from "../../scripts/DataProvider";
import Modal from "./../Global/Modal";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import Alert from "../Global/Alert";
import { useState } from "react";
import ReactDOM from "react-dom";

function NavBar() {
  const { lat, lng } = useSelector((state) => state.mapCenter);
  const [weatherInfo, setWeatherInfo] = useState({});
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const showWeather = async (callback) => {
    const options = {
      url: APIProvider.getAPIbyName("weather"),
      params: {
        q: `${lat},${lng}`,
      },
      headers: {
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };

    const response = await DataProvider.getData(options);
    if (!response.errorMessage) {
      setWeatherInfo(response);
      setShowWeatherModal(true);
    } else {
      setAlertMessage(response.errorMessage);
      setShowAlert(true);
    }
    callback?.();
  };

  const handleAlertDismiss = () => {
    setShowAlert(false);
  };

  const weatherModalCloseHandler = () => {
    setShowWeatherModal(false);
  };

  return (
    <>
      {showAlert &&
        ReactDOM.createPortal(
          <Alert
            type="danger"
            title={"Oops!"}
            body={alertMessage}
            onDismiss={handleAlertDismiss}
          />,
          document.getElementById("alerts-root")
        )}
      <nav
        className={`navbar navbar-expand-lg navbar-dark bg-dark position-fixed top-0 w-100 z-index-500`}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Tools
          </a>
          <div className="collapsed navbar-collapse">
            <ul className="navbar-nav">
              <DropdownMenu title="Fast travel"></DropdownMenu>
            </ul>
            <NavBarActionButton
              icon={IconProvider.getIconByName("binoculars")}
              button={{
                toggle: "offcanvas",
                target: "offCanvasLeftMenu",
                tooltip: "Search nearby places",
                position: "bottom",
              }}
            />
            <ActionButton
              icon={IconProvider.getIconByName("weather")}
              color="primary"
              action={showWeather}
              tooltip="Show weather conditions"
              position="bottom"
            />
          </div>
          <button className="btn btn-info">
            <i className="bi bi-question-circle"></i>
          </button>
        </div>
      </nav>
      {showWeatherModal &&
        ReactDOM.createPortal(
          <Modal top="50" left="50" centerDiv={true}>
            <WeatherInfo
              data={weatherInfo}
              onModalClose={weatherModalCloseHandler}
            />
          </Modal>,
          document.getElementById("modals-root")
        )}
    </>
  );
}

export default NavBar;
