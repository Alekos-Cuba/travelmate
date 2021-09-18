import styles from "./../../css/dropdownMenu.module.css";
import UID from "../../scripts/IdGenerator";
import DropdownItem from "./DropdownItem";

function DropdownMenu(props) {
  return (
    <>
      <li className={`nav-item dropdown ${styles.dropdownTitle}`}>
        <a
          className="nav-link dropdown-toggle"
          href="/"
          id="navbarDarkDropdownMenuLink"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {props.title}
        </a>
        <ul
          className={`dropdown-menu dropdown-menu-dark ${styles.dropdownList}`}
          aria-labelledby="navbarDarkDropdownMenuLink"
        >
          {props.items?.map((item) => {
            return (
              <DropdownItem
                key={UID.next().value}
                title={item.names.name}
                coords={item.maps}
                zoom={item.maps.zoom}
              ></DropdownItem>
            );
          })}
        </ul>
      </li>
    </>
  );
}

export default DropdownMenu;
