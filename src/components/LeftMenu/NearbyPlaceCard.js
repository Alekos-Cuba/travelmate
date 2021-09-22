import MapManager from "./../../scripts/MapManager";

const NearbyPlaceCard = ({ data }) => {
  const travelToPlace = () => {
    MapManager.getMap().flyTo(
      { lat: data.location.lat, lng: data.location.lng },
      18
    );
  };

  return (
    <>
      <div className="card mt-2">
        <div className="card-header d-flex flex-row justify-content-between bg-dark">
          <span>
            <b>{data.name}</b>
          </span>
          <a className="bg-dark" onClick={travelToPlace}>
            <i className="bi bi-aspect-ratio"></i>
          </a>
        </div>
        <div className="card-body bg-secondary d-flex flex-column">
          {data.address && <label>Address: {data.address}</label>}
          {data.phone_number && <label>Phone: {data.phone_number}</label>}
          {data.distance && <label>Distance: {data.distance} m</label>}
        </div>
      </div>
    </>
  );
};

export default NearbyPlaceCard;
