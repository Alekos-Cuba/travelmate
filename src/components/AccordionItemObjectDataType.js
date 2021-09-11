import UID from "../scripts/IdGenerator";

function AccordionItemObjectDataType(props) {
  const getTelephoneInfo = () => {
    const elems = [];
    Object.keys(props.data).forEach((key) => {
      if (!(props.data[key] instanceof Array) && props.data[key] !== null) {
        elems.push(
          <div key={UID.next().value}>{`${key.replace("_", " ")}: ${
            props.data[key]
          }`}</div>
        );
      }
    });
    return elems;
  };
  return <div className="accordion-body text-black">{getTelephoneInfo()}</div>;
}

export default AccordionItemObjectDataType;
