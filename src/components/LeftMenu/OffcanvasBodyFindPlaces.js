import { useDispatch, useSelector } from "react-redux";
import ReadOnlyInput from "../Global/ReadOnlyInput";
import NearbyPlacesSearchResults from "./NearbyPlacesSearchResults";
import {
  setNearbyPlaces,
  clearNearbyPlaces,
} from "./../../redux/actions/placesActions";
import { useState } from "react";
import RangeInput from "../Global/RangeInput";
import DataProvider from "../../scripts/DataProvider";

const OffcanvasBodyFindPlaces = () => {
  const dispatch = useDispatch();
  const mapCenter = useSelector((state) => state.mapCenter);
  const [searchRadius, setSearchRadius] = useState();
  const [searching, setSearching] = useState(false);

  const searchRadiusChanged = (radius) => {
    setSearchRadius(radius);
  };

  const handleFindButtonClick = async (e) => {
    e.preventDefault();
    setSearching(true);
    var options = {
      method: "GET",
      url: "https://trueway-places.p.rapidapi.com/FindPlacesNearby",
      params: {
        location: `${mapCenter.lat},${mapCenter.lng}`,
        language: "en",
        radius: searchRadius,
      },
      headers: {
        "x-rapidapi-host": "trueway-places.p.rapidapi.com",
        "x-rapidapi-key": "8217908345msh55f2b71a7356f61p1e3d98jsn578f274acdf7",
      },
    };

    const data = await DataProvider.getData(options);
    if (data.results?.length > 0) {
      dispatch(setNearbyPlaces(data.results));
    } else {
      clearResults();
    }
    setSearching(false);
  };

  const clearResults = (e) => {
    e?.preventDefault();
    dispatch(clearNearbyPlaces());
  };

  return (
    <>
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
            <button
              className="btn btn-success"
              type="submit"
              onClick={handleFindButtonClick}
              disabled={searching}
            >
              {searching ? (
                <div>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Searching...
                </div>
              ) : (
                "Search"
              )}
            </button>
            <button className="btn btn-danger" onClick={clearResults}>
              Clear
            </button>
          </div>
        </form>
      </div>
      <NearbyPlacesSearchResults />
    </>
  );
};

export default OffcanvasBodyFindPlaces;
