const NavBarActionButton = (props) => {
  return (
    <button
      className="btn btn-primary"
      type="button"
      data-bs-toggle={props.toggle}
      data-bs-target={`#${props.target}`}
      aria-controls={props.target}
    >
      <i className={`bi bi-${props.icon}`}></i>
    </button>
  );
};

export default NavBarActionButton;
