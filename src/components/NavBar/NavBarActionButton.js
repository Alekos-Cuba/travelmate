const NavBarActionButton = ({ icon, button }) => {
  return (
    <button
      className="btn btn-primary"
      type="button"
      data-bs-toggle={button.toggle}
      data-bs-target={`#${button.target}`}
      aria-controls={button.target}
      data-bs-placement="bottom"
      title={button.tooltip}
    >
      <i className={`bi bi-${icon}`}></i>
    </button>
  );
};

export default NavBarActionButton;
