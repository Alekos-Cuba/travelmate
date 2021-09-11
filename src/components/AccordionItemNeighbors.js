import UID from "../scripts/IdGenerator";

function AccordionItemNeighbors(props) {
  return (
    <div className="accordion-body text-black">
      {props.data.map((elem) => {
        return <div key={UID.next().value}>{elem.name}</div>;
      })}
    </div>
  );
}

export default AccordionItemNeighbors;
