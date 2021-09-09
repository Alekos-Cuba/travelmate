import MapManager from "../scripts/MapManager";
import "./../css/navbar.css";
import DropdownMenu from "./DropdownMenu";
import NavbarButton from "./NavbarButton";

function NavBar() {
  const menu = [
    {
      id: 0,
      title: "Dataset",
    },
    {
      id: 1,
      title: "Add",
    },
  ];

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
              return <DropdownMenu key={m.id} title={m.title}></DropdownMenu>;
            })}
            <NavbarButton
              icon={MapManager.ICON_TYPES.get("SHOP").name}
              action={MapManager.createMarker}
            ></NavbarButton>
            <NavbarButton
              icon={MapManager.ICON_TYPES.get("MARKER").name}
              action={MapManager.createMarker}
            ></NavbarButton>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
