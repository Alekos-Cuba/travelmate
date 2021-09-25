const Modal = ({ top, bottom, left, right, centerDiv, children }) => {
  return (
    <div
      className={`position-absolute ${top && `top-${top}`} ${
        bottom && `bottom-${bottom}`
      } ${right && `right-${right}`}
      ${left && `start-${left}`} ${centerDiv && "translate-middle"}`}
    >
      {children}
    </div>
  );
};

export default Modal;
