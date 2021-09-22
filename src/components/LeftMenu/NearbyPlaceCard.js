const NearbyPlaceCard = ({ data }) => {
  return (
    <>
      <div className="card mt-2">
        <div className="card-header bg-dark">
          <b>{data.name}</b>
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
