import styles from "./../../css/dropdownItem.module.css";
import MapManager from "../../scripts/MapManager";

function DropdownItem({ zoom, coords, title }) {
  const mapZoom = zoom < 5 ? 5 : zoom;
  const handleClick = () => {
    const { lat, long } = coords;
    MapManager.getMap().flyTo({ lat: lat, lng: long }, mapZoom);
  };

  return (
    <>
      <li>
        <a className="dropdown-item" href="#" onClick={handleClick}>
          <div className={styles.dropdownItemContent}>
            <span className={styles.dropdownItemTitle}>{title}</span>
          </div>
        </a>
      </li>
    </>
  );
}

export default DropdownItem;
