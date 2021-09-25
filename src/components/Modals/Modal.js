const Modal = ({ top, bottom, left, right, centerDiv, children }) => {
  const getClasses = () => {
    let classes = "";
    classes += top !== undefined ? `top-${top} ` : "";
    classes += bottom !== undefined ? `bottom-${bottom} ` : "";
    classes += left !== undefined ? `start-${left} ` : "";
    classes += right !== undefined ? `end-${right} ` : "";
    classes += centerDiv === true ? "translate-middle" : "";

    return classes;
  };

  return (
    <div className={`position-absolute ${getClasses()} z-index-600`}>
      {children}
    </div>
  );
};

export default Modal;
