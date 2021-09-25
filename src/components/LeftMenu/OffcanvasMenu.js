const OffcanvasMenu = ({ id, title, position, children }) => {
  return (
    <div
      className={`offcanvas offcanvas-${position} bg-dark text-white`}
      tabIndex="-1"
      id={id}
      aria-labelledby={`${id}Label`}
    >
      <div className="offcanvas-header">
        <h5 id={`${id}Label`}>{title}</h5>
        <button
          type="button"
          className="btn-close text-reset btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">{children}</div>
    </div>
  );
};

export default OffcanvasMenu;
