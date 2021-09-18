import styles from "./../../css/dropdownItem.module.css";
import MapManager from "../../scripts/MapManager";

function DropdownItem(props) {
  const zoom = props.zoom < 5 ? 5 : props.zoom;
  const handleClick = () => {
    const { lat, long } = props.coords;
    MapManager.getMap().flyTo({ lat: lat, lng: long }, zoom);
  };

  return (
    <>
      <li>
        <a className="dropdown-item" href="#" onClick={handleClick}>
          <div className={styles.dropdownItemContent}>
            <span className={styles.dropdownItemTitle}>{props.title}</span>
          </div>
        </a>
      </li>
    </>
  );
}

export default DropdownItem;
