function DropdownItem(props) {
  return (
    <div>
      <li>
        <a className="dropdown-item" href="#">
          <i className={`bi bi-${props.icon}`}> - {props.title}</i>
        </a>
      </li>
    </div>
  );
}

export default DropdownItem;
