import "./../css/navbar.css";
import { useState } from "react";
import axios from "axios";
import DropdownMenu from "./../components/DropdownMenu";

function NavBar(props) {
  const [searchText, setSearchText] = useState();

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    var options = {
      method: "GET",
      url: "https://trueway-places.p.rapidapi.com/FindPlaceByText",
      params: { text: { searchText }, language: "en" },
      headers: {
        "x-rapidapi-host": "trueway-places.p.rapidapi.com",
        "x-rapidapi-key": "8217908345msh55f2b71a7356f61p1e3d98jsn578f274acdf7",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Tools
        </a>
        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul className="navbar-nav">
            <DropdownMenu
              title="Fast travel"
              items={props.countryList}
            ></DropdownMenu>
          </ul>
        </div>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleSearchTextChange}
          />
          <button className="btn btn-outline-success" onClick={handleSearch}>
            Search
          </button>
        </form>
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
