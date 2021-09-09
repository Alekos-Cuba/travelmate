import "./../css/navbar.css";
import DropdownMenu from "./DropdownMenu";
import axios from "axios";
import { useEffect, useState } from "react";

function NavBar() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/menu").then((res) => {
      if (res.status === 200) {
        setMenu(res.data);
      }
    });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Menu
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDarkDropdown"
          aria-controls="navbarNavDarkDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul className="navbar-nav">
            {menu.map((m) => {
              return (
                <DropdownMenu
                  key={m._id}
                  title={m.title}
                  items={m.items}
                ></DropdownMenu>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

/*
<NavbarButton
  icon={MapManager.ICON_TYPES.get("SHOP").name}
  action={MapManager.createMarker}
></NavbarButton>
<NavbarButton
  icon={MapManager.ICON_TYPES.get("MARKER").name}
  action={MapManager.createMarker}
></NavbarButton>*/
