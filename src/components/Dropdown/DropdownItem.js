import APIProvider from "../../scripts/APIProvider";
import DataProvider from "../../scripts/DataProvider";
import MapManager from "../../scripts/MapManager";
import { useDispatch } from "react-redux";
import { setBoundary } from "./../../redux/actions/boundaryAction";

function DropdownItem({ zoom, coords, title, flag }) {
  const dispatch = useDispatch();
  const mapZoom = zoom < 5 ? 5 : zoom;

  const handleClick = async () => {
    const { lat, long } = coords;
    MapManager.getMap().flyTo({ lat: lat, lng: long }, mapZoom);

    const options = {
      url: APIProvider.getAPIbyName("countryBoundary"),
      params: {
        q: title,
        polygon_geojson: 1,
        format: "jsonv2",
      },
    };
    const response = await DataProvider.getData(options);
    if (!response.errorMessage) {
      const boundary = response.reduce((prev, current) => {
        return prev.importance > current.importance ? prev : current;
      });
      console.log(boundary);
      dispatch(setBoundary([boundary]));
    } else {
      console.log(response.errorMessage);
    }
  };

  return (
    <>
      <li>
        <a className="dropdown-item" href="#" onClick={handleClick}>
          <div className="d-flex flex-row justify-content-start">
            <img src={flag} alt="flag"></img>
            <span className="ms-10">{title}</span>
          </div>
        </a>
      </li>
    </>
  );
}

export default DropdownItem;
