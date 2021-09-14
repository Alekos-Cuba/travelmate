import "./../../css/overlay.css";

function Overlay(props) {
  const style = {
    backgroundColor: props.backgroundColor,
    width: props.fullScreen ? "100%" : "200px",
    height: props.fullScreen ? "100%" : "100px",
    top: props.fullScreen ? 0 : "50%",
    left: props.fullScreen ? 0 : "50%",
    justifyContent: props.fullScreen ? "center" : "left",
  };
  return (
    <div className="overlay" style={style}>
      {props.children}
    </div>
  );
}

export default Overlay;
