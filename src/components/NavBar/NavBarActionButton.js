const NavBarActionButton = ({ toggle, target, icon }) => {
  return (
    <button
      className="btn btn-primary"
      type="button"
      data-bs-toggle={toggle}
      data-bs-target={`#${target}`}
      aria-controls={target}
    >
      <i className={`bi bi-${icon}`}></i>
    </button>
  );
};

export default NavBarActionButton;
