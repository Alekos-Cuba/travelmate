import { useState } from "react";
import MapManager from "../scripts/MapManager";
import DropdownItem from "./DropdownItem";

function DropdownMenu(props) {
  const items = [
    {
      id: 0,
      title: "Categories",
      icon: MapManager.ICON_TYPES.get("CATEGORY").name,
    },
    {
      id: 1,
      title: "Settings",
      icon: MapManager.ICON_TYPES.get("SETTINGS").name,
    },
  ];

  return (
    <div>
      <li className="nav-item dropdown">
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
          className="dropdown-menu dropdown-menu-dark"
          aria-labelledby="navbarDarkDropdownMenuLink"
        >
          {items.map((item) => {
            return (
              <DropdownItem
                key={item.id}
                title={item.title}
                icon={item.icon}
              ></DropdownItem>
            );
          })}
        </ul>
      </li>
    </div>
  );
}

export default DropdownMenu;
