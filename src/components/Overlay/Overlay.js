import "./../../css/overlay.css";

function Overlay(props) {
  const style = {
    backgroundColor: props.backgroundColor,
    width: props.fullScreen ? "100%" : "200px",
    height: props.fullScreen ? "100%" : "30px",
    top: props.fullScreen ? 0 : "calc(50% - 10px)",
    left: props.fullScreen ? 0 : "calc(50% - 100px)",
  };
  return (
    <div className="overlay" style={style}>
      {props.children}
    </div>
  );
}

export default Overlay;
