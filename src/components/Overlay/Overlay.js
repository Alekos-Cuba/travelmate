import styles from "./../../css/overlay.module.css";

function Overlay({ backgroundColor, fullScreen, children }) {
  const style = {
    backgroundColor: backgroundColor,
    width: fullScreen ? "100%" : "200px",
    height: fullScreen ? "100%" : "30px",
    top: fullScreen ? 0 : "calc(50% - 10px)",
    left: fullScreen ? 0 : "calc(50% - 100px)",
  };
  return (
    <div className={styles.overlay} style={style}>
      {children}
    </div>
  );
}

export default Overlay;
