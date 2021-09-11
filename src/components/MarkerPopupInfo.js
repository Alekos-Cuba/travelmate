import "./../css/markerPopupInfo.css";

function MarkerPopupInfo(props) {
  const handleClick = () => {
    props.onShowDetails?.(props.data);
  };

  return (
    <div className="marker-popup-info">
      <h6>{`${props.data.names.name} (${props.data.names.continent})`}</h6>
      <a href="#" className="card-link" onClick={handleClick}>
        Show all info
      </a>
    </div>
  );
}

export default MarkerPopupInfo;
