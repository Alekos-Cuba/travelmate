import styles from "./../css/markerPopupInfo.module.css";

function MarkerPopupInfo({ onShowDetails, data }) {
  const handleClick = () => {
    onShowDetails?.(data);
  };

  return (
    <div className={styles.markerPopupInfo}>
      <h6>{`${data.names.name} (${data.names.iso3})`}</h6>
      <a href="#" className="card-link" onClick={handleClick}>
        Show all info
      </a>
    </div>
  );
}

export default MarkerPopupInfo;
