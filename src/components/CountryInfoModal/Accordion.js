function Accordion(props) {
  return (
    <div className="accordion" id={props.id}>
      {props.children}
    </div>
  );
}

export default Accordion;
