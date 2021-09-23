import MapManager from "./../../scripts/MapManager";

const NearbyPlaceCard = ({ data }) => {
  const travelToPlace = () => {
    MapManager.getMap().flyTo(
      { lat: data.location.lat, lng: data.location.lng },
      18
    );
  };

  const getIcon = () => {
    let icons = MapManager.getIconCategories();
    let placeIcon = "";
    for (let i = 0; i < data.types.length; i++) {
      if (icons.has(data.types[i])) {
        return icons.get(data.types[i]);
      }
    }
    return placeIcon;
  };

  return (
    <>
      <div className="card mt-2">
        <div className="card-header d-flex flex-row justify-content-between bg-dark">
          <i className={`bi ${getIcon()} text-primary me-1`}></i>
          <span>
            <b>{data.name}</b>
          </span>
          <a
            className="bg-dark link-warning"
            data-bs-placement="top"
            title="Zoom to place"
            style={{ cursor: "pointer" }}
            onClick={travelToPlace}
          >
            <i className="bi bi-aspect-ratio"></i>
          </a>
        </div>
        <div className="card-body bg-secondary d-flex flex-column">
          {data.distance && <label>Distance: {data.distance} m</label>}
          {data.address && <label>Address: {data.address}</label>}
          {data.phone_number && <label>Phone: {data.phone_number}</label>}
          {data.website && (
            <div>
              <label>Website: </label>
              <a
                className="link-warning"
                href={data.website}
                target="_blank"
                rel="noreferrer"
              >
                {data.website}
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NearbyPlaceCard;
