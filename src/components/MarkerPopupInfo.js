import "./../css/markerPopupInfo.css";

function MarkerPopupInfo(props) {
  const handleClick = () => {
    props.onShowDetails?.();
  };

  return (
    <div className="marker-popup-info">
      <h6>{`${props.data.names.name} (${props.data.names.continent})`}</h6>
      <button className="btn btn-primary" onClick={handleClick}>
        Details
      </button>
    </div>
  );
}

export default MarkerPopupInfo;
