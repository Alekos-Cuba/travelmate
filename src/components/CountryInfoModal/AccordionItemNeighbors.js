import UID from "./../../scripts/IdGenerator";

function AccordionItemNeighbors({ data }) {
  return (
    <div className="accordion-body text-black">
      {data.map((elem) => {
        return <div key={UID.next().value}>{elem.name}</div>;
      })}
    </div>
  );
}

export default AccordionItemNeighbors;
