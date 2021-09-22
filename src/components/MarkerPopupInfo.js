function MarkerPopupInfo({ onShowDetails, data }) {
  const handleClick = () => {
    onShowDetails?.(data);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex flex-row justify-content-between align-items-end">
        <img src={data.flag} alt="flag"></img>
        <h6>{`${data.names.name} ${
          data.names.iso3 ? `(${data.names.iso3})` : ""
        }`}</h6>
      </div>
      <a href="#" className="card-link" onClick={handleClick}>
        Show all info
      </a>
    </div>
  );
}

export default MarkerPopupInfo;
