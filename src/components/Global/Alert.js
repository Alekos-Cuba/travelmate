import IconProvider from "../../scripts/IconProvider";

const Alert = ({ title, body, type, onDismiss }) => {
  return (
    <div
      className={`alert alert-${type} position-absolute top-50 start-50 translate-middle z-index-600 d-flex flex-column`}
      role="alert"
    >
      <div className="d-flex flex-row justify-content-between">
        <div>
          <i className={`${IconProvider.getIconByName("error")} me-2`}></i>
          <span className="fw-bold">{title}</span>
        </div>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onDismiss}
        ></button>
      </div>
      <br />
      <div>{body}</div>
    </div>
  );
};

export default Alert;
