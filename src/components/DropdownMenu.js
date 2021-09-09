import DropdownItem from "./DropdownItem";

function DropdownMenu(props) {
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
          {props.items?.map((item) => {
            return (
              <DropdownItem
                key={item._id}
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
