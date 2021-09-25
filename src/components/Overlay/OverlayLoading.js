const OverlayLoading = () => {
  return (
    <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center z-index-600">
      <div className="spinner-border text-primary" role="status"></div>
      <span className="fs-3 text text-white ms-2">
        Loading map info... please wait
      </span>
    </div>
  );
};

export default OverlayLoading;
