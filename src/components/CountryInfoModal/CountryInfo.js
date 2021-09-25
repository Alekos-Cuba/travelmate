import Accordion from "./Accordion";
import AccordionItem from "./AccordionItem";
import AccordionItemObjectDataType from "./AccordionItemObjectDataType";
import AccordionItemLanguages from "./AccordionItemLanguages";
import AccordionItemNeighbors from "./AccordionItemNeighbors";

function CountryInfo({ data, onDetailsClose }) {
  const handleClose = () => {
    onDetailsClose?.();
  };

  return (
    <div className="card text-white bg-dark mb-3 z-index-600 modal-fitcontent">
      <div className="card-body">
        <div className="d-flex flex-row justify-content-between">
          <h5 className="card-title">{data.names.name}</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </div>
        <h6 className="card-subtitle mb-2 text-muted">
          {`${data.names.full} (Continent: ${data.names?.continent})`}
        </h6>
        <Accordion id="countryInfoAccordion">
          <AccordionItem
            headerId="neighborsHeader"
            bodyId="neigborsBody"
            parentId="countryInfoAccordion"
            show={true}
            collapsed={false}
            aria_expanded={true}
            title="Neighbor countries"
          >
            <AccordionItemNeighbors
              data={data.neighbors}
            ></AccordionItemNeighbors>
          </AccordionItem>
          <AccordionItem
            headerId="phonesHeader"
            bodyId="phonesBody"
            parentId="countryInfoAccordion"
            show={false}
            collapsed={true}
            aria_expanded={false}
            title="Emergency phones"
          >
            <AccordionItemObjectDataType
              data={data.telephone}
            ></AccordionItemObjectDataType>
          </AccordionItem>
          <AccordionItem
            headerId="langHeader"
            bodyId="langBody"
            parentId="countryInfoAccordion"
            show={false}
            collapsed={true}
            aria_expanded={false}
            title="Languages"
          >
            <AccordionItemLanguages
              data={data.language}
            ></AccordionItemLanguages>
          </AccordionItem>
          <AccordionItem
            headerId="currencyHeader"
            bodyId="currencyBody"
            parentId="countryInfoAccordion"
            show={false}
            collapsed={true}
            aria_expanded={false}
            title="Currency(s)"
          >
            <AccordionItemObjectDataType
              data={data.currency}
            ></AccordionItemObjectDataType>
          </AccordionItem>
        </Accordion>
        <br />
        <a
          href={data.advise?.CA?.url}
          className="card-link"
          target="_blank"
          rel="noreferrer"
        >
          CA Travel website
        </a>
      </div>
    </div>
  );
}

export default CountryInfo;
