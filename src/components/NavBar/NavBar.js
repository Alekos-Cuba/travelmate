import styles from "./../../css/navbar.module.css";
import DropdownMenu from "../Dropdown/DropdownMenu";
import NavBarActionButton from "./NavBarActionButton";
import ActionButton from "../Global/ActionButton";
import IconProvider from "../../scripts/IconProvider";
import APIProvider from "./../../scripts/APIProvider";
import { useSelector } from "react-redux";
import DataProvider from "../../scripts/DataProvider";

function NavBar() {
  const { lat, lng } = useSelector((state) => state.mapCenter);

  const showWeather = async (callback) => {
    const options = {
      url: APIProvider.getAPIbyName("weather"),
      params: {
        q: `${lat},${lng}`,
      },
      headers: {
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        "x-rapidapi-key": "8217908345msh55f2b71a7356f61p1e3d98jsn578f274acdf7",
      },
    };

    const response = await DataProvider.getData(options);
    if (!response.errorMessage) {
      console.log(response);
    }
    callback?.();
  };

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
              icon={IconProvider.getIconByName("binoculars")}
              button={{
                toggle: "offcanvas",
                target: "offCanvasLeftMenu",
                tooltip: "Search nearby places",
                position: "bottom",
              }}
            />
            <ActionButton
              icon={IconProvider.getIconByName("weather")}
              color="primary"
              action={showWeather}
            />
          </div>
          <button className="btn btn-info">
            <i className="bi bi-question-circle"></i>
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
