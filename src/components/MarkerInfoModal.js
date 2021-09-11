import { useState } from "react";
import "./../css/markerInfoModal.css";

function MarkerInfoModal(props) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  const handleClose = (e) => {
    let saveData = false;
    let markerData;
    let coords = {
      lat: props.markerCoords[0],
      lng: props.markerCoords[1],
    };
    if (e.target.id === "save") {
      saveData = true;
      markerData = {
        name: name,
        description: description,
        stars: 3,
        coords: coords,
      };
    }
    props?.onCloseModal(saveData, markerData);
  };

  return (
    <div className="modal infoModal modal-dialog modal-dialog-centered">
      <div className="modal-content bg-dark">
        <div className="modal-header">
          <h5 className="modal-title">New marker</h5>
          <button
            id="xclose"
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
            <input
              type="text"
              className="form-control"
              id="poiName"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="poiDescription" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="poiDescription"
              rows="3"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            id="close"
            className="btn btn-secondary"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="button"
            id="save"
            className="btn btn-primary"
            onClick={handleClose}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default MarkerInfoModal;
