import { useDispatch, useSelector } from "react-redux";
import ReadOnlyInput from "../Global/ReadOnlyInput";
import NearbyPlacesSearchResults from "./NearbyPlacesSearchResults";
import IconProvider from "../../scripts/IconProvider";
import {
  setNearbyPlaces,
  clearNearbyPlaces,
} from "./../../redux/actions/placesActions";
import { useState } from "react";
import RangeInput from "../Global/RangeInput";
import DataProvider from "../../scripts/DataProvider";
import APIProvider from "../../scripts/APIProvider";
import ActionButton from "../Global/ActionButton";
import ReactDOM from "react-dom";
import Alert from "../Global/Alert";

const OffcanvasBodyFindPlaces = () => {
  const dispatch = useDispatch();
  const mapCenter = useSelector((state) => state.mapCenter);
  const [searchRadius, setSearchRadius] = useState(150);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const searchRadiusChanged = (radius) => {
    setSearchRadius(radius);
  };

  const handleAlertDismiss = () => {
    setShowAlert(false);
  };

  const handleFindButtonClick = async (callback) => {
    var options = {
      method: "GET",
      url: APIProvider.getAPIbyName("nearbyPlaces"),
      params: {
        location: `${mapCenter.lat},${mapCenter.lng}`,
        language: "en",
        radius: searchRadius,
      },
      headers: {
        "x-rapidapi-host": "trueway-places.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };

    const data = await DataProvider.getData(options);
    if (data.errorMessage) {
      setAlertMessage(data.errorMessage);
      setShowAlert(true);
    } else if (data.results?.length > 0) {
      dispatch(setNearbyPlaces(data.results));
    } else {
      clearResults();
    }
    callback?.();
  };

  const clearResults = (callback) => {
    dispatch(clearNearbyPlaces());
    callback?.();
  };

  return (
    <>
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
      <div className="container">
        <form className="d-flex flex-column">
          <ReadOnlyInput
            ariaLabel="Latitude input"
            input={{
              id: "latInput",
              type: "text",
              value: mapCenter.lat,
            }}
            label="Latitude"
          />
          <ReadOnlyInput
            ariaLabel="Longitude input"
            input={{ id: "lngInput", type: "text", value: mapCenter.lng }}
            label="Longitude"
          />
          <RangeInput
            label="Distance (m)"
            input={{
              id: "distanceRangeInput",
              min: 50,
              max: 300,
              step: 10,
              defaultValue: 150,
            }}
            onRangeChange={searchRadiusChanged}
          />
          <div className="mt-2 d-flex flex-row justify-content-evenly">
            <ActionButton
              icon={IconProvider.getIconByName("search")}
              color="success"
              action={handleFindButtonClick}
              label="Search"
            />
            <ActionButton
              icon={IconProvider.getIconByName("clear")}
              color="danger"
              action={clearResults}
              label="Clear"
            />
          </div>
        </form>
      </div>
      <NearbyPlacesSearchResults />
    </>
  );
};

export default OffcanvasBodyFindPlaces;
