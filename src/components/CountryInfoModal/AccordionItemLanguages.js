import UID from "./../../scripts/IdGenerator";

function AccordionItemLanguages({ data }) {
  return (
    <div className="accordion-body text-black">
      {data.map((elem) => {
        return (
          <div key={UID.next().value}>{`${elem.language} ${
            elem.official === "Yes" ? `(Official)` : ""
          }`}</div>
        );
      })}
    </div>
  );
}

export default AccordionItemLanguages;
