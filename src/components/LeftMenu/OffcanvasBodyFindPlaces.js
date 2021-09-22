import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ReadOnlyInput from "./ReadOnlyInput";
import NearbyPlacesSearchResults from "./NearbyPlacesSearchResults";
import { setNearbyPlaces } from "./../../redux/actions/placesActions";
import { useState } from "react";

const OffcanvasBodyFindPlaces = () => {
  const dispatch = useDispatch();
  const mapCenter = useSelector((state) => state.mapCenter);
  const [searching, setSearching] = useState(false);

  const handleFindButtonClick = (e) => {
    e.preventDefault();
    setSearching(true);
    var options = {
      method: "GET",
      url: "https://trueway-places.p.rapidapi.com/FindPlacesNearby",
      params: {
        location: `${mapCenter.lat},${mapCenter.lng}`,
        language: "en",
        radius: "150",
      },
      headers: {
        "x-rapidapi-host": "trueway-places.p.rapidapi.com",
        "x-rapidapi-key": "8217908345msh55f2b71a7356f61p1e3d98jsn578f274acdf7",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        if (response.data.results?.length > 0) {
          console.log(response.data);
          dispatch(setNearbyPlaces(response.data.results));
        } else {
          dispatch(setNearbyPlaces([]));
        }
        setSearching(false);
      })
      .catch(function (error) {
        console.error(error);
        setSearching(false);
      });
  };

  return (
    <>
      <div className="container">
        <form>
          <ReadOnlyInput
            input={{
              id: "latInput",
              type: "text",
              value: mapCenter.lat,
            }}
            label="Latitude"
          />
          <ReadOnlyInput
            input={{ id: "latInput", type: "text", value: mapCenter.lng }}
            label="Longitude"
          />
          <button
            className="btn btn-success mt-2"
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
        </form>
      </div>
      <NearbyPlacesSearchResults />
    </>
  );
};

export default OffcanvasBodyFindPlaces;
