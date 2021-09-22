function NavbarButton({ action, icon }) {
  return (
    <button
      type="button"
      className="btn btn-dark"
      data-bs-toggle="button"
      onClick={action}
    >
      <i className={`bi bi-${icon}`}></i>
    </button>
  );
}

export default NavbarButton;
