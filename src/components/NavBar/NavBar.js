import styles from "./../../css/navbar.module.css";
import axios from "axios";
import DropdownMenu from "../Dropdown/DropdownMenu";
import NavBarActionButton from "./NavBarActionButton";

function NavBar(props) {
  const handleSearch = (e) => {
    e.preventDefault();
    var options = {
      method: "GET",
      url: "https://trueway-places.p.rapidapi.com/FindPlacesNearby",
      params: {
        location: "37.783366,-122.402325",
        language: "en",
        radius: "150",
      },
      headers: {
        "x-rapidapi-host": "trueway-places.p.rapidapi.com",
        "x-rapidapi-key": "8217908345msh55f2b71a7356f61p1e3d98jsn578f274acdf7",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        if (response.data.results?.length > 0) {
          props.onLocationFound?.({
            data: response.data.results,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-dark bg-dark ${styles.fixedNavbar}`}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Tools
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <DropdownMenu title="Fast travel"></DropdownMenu>
            </ul>
            <NavBarActionButton
              icon="pin-map"
              toggle="offcanvas"
              target="offCanvasLeftMenu"
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
