import styles from "./../../css/navbar.module.css";
import DropdownMenu from "../Dropdown/DropdownMenu";
import NavBarActionButton from "./NavBarActionButton";

function NavBar(props) {
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-dark bg-dark position-fixed top-0 w-100 ${styles.fixedNavbar}`}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Tools
          </a>
          <div className="collapsed navbar-collapse">
            <ul className="navbar-nav">
              <DropdownMenu title="Fast travel"></DropdownMenu>
            </ul>
            <NavBarActionButton
              icon="pin-map"
              toggle="offcanvas"
              target="offCanvasLeftMenu"
            />
          </div>
          <button className="btn btn-info">?</button>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
