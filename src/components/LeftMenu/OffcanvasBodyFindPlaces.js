import { useSelector } from "react-redux";
import axios from "axios";
import ReadOnlyInput from "./ReadOnlyInput";

const OffcanvasBodyFindPlaces = (props) => {
  const mapCenter = useSelector((state) => state.mapCenter);

  const handleFindButtonClick = (e) => {
    e.preventDefault();
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
        console.log(response);
        if (response.data.results?.length > 0) {
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <div className="container">
        <form>
          <ReadOnlyInput
            id="latInput"
            type="text"
            value={mapCenter.lat}
            label="Latitude"
          />
          <ReadOnlyInput
            id="latInput"
            type="text"
            value={mapCenter.lng}
            label="Longitude"
          />
          <button
            className="btn btn-success mt-2"
            type="submit"
            onClick={handleFindButtonClick}
          >
            Find
          </button>
        </form>
      </div>
    </>
  );
};

export default OffcanvasBodyFindPlaces;
