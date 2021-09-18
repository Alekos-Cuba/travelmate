import styles from "./../css/markerPopupInfo.module.css";

function MarkerPopupInfo(props) {
  const handleClick = () => {
    props.onShowDetails?.(props.data);
  };

  return (
    <div className={styles.markerPopupInfo}>
      <h6>{`${props.data.names.name} (${props.data.names.iso3})`}</h6>
      <a href="#" className="card-link" onClick={handleClick}>
        Show all info
      </a>
    </div>
  );
}

export default MarkerPopupInfo;
