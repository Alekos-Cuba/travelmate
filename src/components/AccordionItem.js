function AccordionItem(props) {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={props.headerId}>
        <button
          className={`accordion-button ${props.collapsed ? "collapsed" : ""}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${props.bodyId}`}
          aria-expanded={props.aria_expanded}
          aria-controls={props.bodyId}
        >
          {props.title}
        </button>
      </h2>
      <div
        id={props.bodyId}
        className={`accordion-collapse collapse ${props.show ? "show" : ""}`}
        aria-labelledby={props.headerId}
        data-bs-parent={`#${props.parentId}`}
      >
        {props.children}
      </div>
    </div>
  );
}

export default AccordionItem;
