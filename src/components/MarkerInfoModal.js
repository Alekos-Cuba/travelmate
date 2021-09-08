import "./../css/markerInfoModal.css";

function MarkerInfoModal(props) {
  const handleClose = () => {
    props?.onCloseModal();
  };

  return (
    <div
      className={`${
        props.show ? "" : "infoModal-hidden"
      } modal infoModal modal-dialog modal-dialog-centered`}
    >
      <div className="modal-content bg-dark">
        <div className="modal-header">
          <h5 className="modal-title">New marker</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="poiName" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="poiName" />
          </div>
          <div className="mb-3">
            <label htmlFor="poiDescription" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="poiDescription"
              rows="3"
            ></textarea>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClose}
          >
            Close
          </button>
          <button type="button" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default MarkerInfoModal;
