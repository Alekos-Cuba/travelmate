import styles from "./../../css/overlay.module.css";

const OverlayLoading = () => {
  return (
    <>
      <div className="spinner-border text-primary" role="status"></div>
      <h5 className={styles.loadingOverlayText}>
        Loading map info... please wait
      </h5>
    </>
  );
};

export default OverlayLoading;
