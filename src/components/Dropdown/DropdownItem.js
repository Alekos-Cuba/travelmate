import styles from "./../../css/dropdownItem.module.css";
import MapManager from "../../scripts/MapManager";

function DropdownItem({ zoom, coords, title, flag }) {
  const mapZoom = zoom < 5 ? 5 : zoom;
  const handleClick = () => {
    const { lat, long } = coords;
    MapManager.getMap().flyTo({ lat: lat, lng: long }, mapZoom);
  };

  return (
    <>
      <li>
        <a className="dropdown-item" href="#" onClick={handleClick}>
          <div className="d-flex flex-row justify-content-start">
            <img src={flag} alt="flag"></img>
            <span className={styles.dropdownItemTitle}>{title}</span>
          </div>
        </a>
      </li>
    </>
  );
}

export default DropdownItem;
