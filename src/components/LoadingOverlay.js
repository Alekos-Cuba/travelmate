import "./../css/loadingOverlay.css";

function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <div className="spinner-border text-primary" role="status"></div>
      <h5 className="loading-overlay-text">
        Loading map information... please wait
      </h5>
    </div>
  );
}

export default LoadingOverlay;
