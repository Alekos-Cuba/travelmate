import "./../css/dropdownItem.css";
import MapManager from "../scripts/MapManager";

function DropdownItem(props) {
  const getIcon = () => {
    for (let value of MapManager.ICON_TYPES.values()) {
      if (value.type === props.icon) return value.name;
    }
  };

  const handleClick = () => {
    switch (props.action) {
      case MapManager.ACTIONS.ADD_MARKER: {
        MapManager.setCurrentState(MapManager.ACTIONS.ADD_MARKER);
        break;
      }
      case MapManager.ACTIONS.SHOW_MARKER_INFO: {
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <div>
      <li>
        <a className="dropdown-item" href="#" onClick={handleClick}>
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
