function MarkerPopupInfo({ onShowDetails, data }) {
  const handleClick = () => {
    onShowDetails?.(data);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h6>{`${data.names.name} (${data.names.iso3})`}</h6>
      <a href="#" className="card-link" onClick={handleClick}>
        Show all info
      </a>
    </div>
  );
}

export default MarkerPopupInfo;
