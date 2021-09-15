const OffcanvasMenu = (props) => {
  return (
    <div
      className={`offcanvas offcanvas-${props.position} bg-dark text-white`}
      tabIndex="-1"
      id={props.id}
      aria-labelledby={`${props.id}Label`}
    >
      <div className="offcanvas-header">
        <h5 id={`${props.id}Label`}>{props.title}</h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">{props.children}</div>
    </div>
  );
};

export default OffcanvasMenu;
