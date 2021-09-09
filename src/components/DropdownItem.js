import "./../css/dropdownItem.css";
import MapManager from "../scripts/MapManager";

function DropdownItem(props) {
  const getIcon = () => {
    for (let value of MapManager.ICON_TYPES.values()) {
      if (value.type === props.icon) return value.name;
    }
  };
  return (
    <div>
      <li>
        <a className="dropdown-item" href="#">
          <div className="dropdown-item-content">
            <i className={`bi bi-${getIcon()}`}></i>
            <span className="dropdown-item-title">{props.title}</span>
          </div>
        </a>
      </li>
    </div>
  );
}

export default DropdownItem;
