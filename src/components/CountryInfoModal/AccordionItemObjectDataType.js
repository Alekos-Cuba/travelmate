import UID from "./../../scripts/IdGenerator";

function AccordionItemObjectDataType({ data }) {
  const getTelephoneInfo = () => {
    const elems = [];
    Object.keys(data).forEach((key) => {
      if (!(data[key] instanceof Array) && data[key] !== null) {
        elems.push(
          <div key={UID.next().value}>{`${key.replace("_", " ")}: ${
            data[key]
          }`}</div>
        );
      }
    });
    return elems;
  };
  return <div className="accordion-body text-black">{getTelephoneInfo()}</div>;
}

export default AccordionItemObjectDataType;
