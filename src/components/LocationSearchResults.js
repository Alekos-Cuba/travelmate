import "./../css/locationSearchResult.css";
import UID from "../scripts/IdGenerator";

function LocationSearchResults(props) {
  const handleClose = () => {
    props.onCloseSearchResults?.();
  };

  return (
    <div className="card bg-dark location-result-container">
      <div className="text-white bg-dark location-result-header">
        <h5>{`Search results (${props.locations.keyword})`}</h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      </div>
      <div className="location-result-body">
        {props.locations.data.map((loc) => {
          return (
            <div key={UID.next().value} className="card text-white bg-dark">
              <div className="card-body">
                <h5 className="card-title">{loc.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{loc.address}</h6>
                <span>{`Phone number: ${loc.phone_number}`}</span>
                <br />
                <span>Website: </span>
                <a
                  href={loc.website}
                  className="link-warning"
                  target="_blank"
                  rel="noreferrer"
                >
                  {loc.website}
                </a>
                <br />
                <a href="#" className="link-warning">
                  Show on map
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationSearchResults;
