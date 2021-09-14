import "./../../css/overlay.css";

function Overlay(props) {
  const style = {
    backgroundColor: props.backgroundColor,
    width: props.fullScreen ? "100%" : "200px",
    height: props.fullScreen ? "100%" : "100px",
    top: props.fullScreen ? 0 : "calc(50% - 45px)",
    left: props.fullScreen ? 0 : "calc(50% - 100px)",
  };
  return (
    <div className="overlay" style={style}>
      {props.children}
    </div>
  );
}

export default Overlay;
