import MapManager from "../scripts/MapManager";
import "./../css/navbar.css";
import NavbarButton from "./NavbarButton";

function NavBar() {
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
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-lines-fill"></i>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Login
                  </a>
                </li>
              </ul>
            </li>
            <NavbarButton
              icon="shop"
              action={MapManager.createMarker}
            ></NavbarButton>
            <NavbarButton
              icon="geo-alt-fill"
              action={MapManager.createMarker}
            ></NavbarButton>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
