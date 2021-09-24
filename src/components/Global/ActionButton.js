import { useState } from "react";

function ActionButton({ action, icon, color, label, tooltip, position }) {
  const [isBusy, setIsBusy] = useState(false);

  const hasLabel = () => {
    return label !== "" && label !== null && label !== undefined;
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsBusy(true);
    //append a callback function to original button action to handle change in states
    action?.(() => {
      setIsBusy(false);
    });
  };

  return (
    <button
      type="button"
      className={`ms-2 btn btn-${color ?? "primary"}`}
      data-bs-toggle="button"
      data-bs-placement={position}
      title={tooltip}
      disabled={isBusy}
      onClick={handleClick}
    >
      {isBusy ? (
        <div>
          <span
            className={`spinner-border spinner-border-sm ${
              hasLabel() && "me-2"
            }`}
            role="status"
            aria-hidden="true"
          ></span>
          {label}
        </div>
      ) : (
        <div>
          <i className={`${hasLabel() && "me-2"} bi ${icon}`}></i>
          {label}
        </div>
      )}
    </button>
  );
}

export default ActionButton;
