function NavbarButton(props) {
  return (
    <button
      type="button"
      className="btn btn-dark"
      data-bs-toggle="button"
      onClick={props.action}
    >
      <i className={`bi bi-${props.icon}`}></i>
    </button>
  );
}

export default NavbarButton;
