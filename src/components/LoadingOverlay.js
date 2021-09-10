import "./../css/loadingOverlay.css";

function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <div className="spinner-border text-primary" role="status"></div>
      <h4 className="loading-overlay-text">
        Loading map information... please wait
      </h4>
    </div>
  );
}

export default LoadingOverlay;
