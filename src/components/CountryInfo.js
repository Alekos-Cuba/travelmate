import "./../css/countryInfo.css";
import Accordion from "./Accordion";
import AccordionItem from "./AccordionItem";
import AccordionItemObjectDataType from "./AccordionItemObjectDataType";
import AccordionItemLanguages from "./AccordionItemLanguages";
import AccordionItemNeighbors from "./AccordionItemNeighbors";

function CountryInfo(props) {
  const handleClose = () => {
    props.onDetailsClose?.();
  };

  return (
    <div className="card text-white bg-dark mb-3 country-info">
      <div className="card-body">
        <div className="country-info-header">
          <h5 className="card-title">{props.data.names.name}</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </div>
        <h6 className="card-subtitle mb-2 text-muted">
          {`${props.data.names.full} (Continent: ${props.data.names?.continent})`}
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
              data={props.data.neighbors}
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
              data={props.data.telephone}
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
              data={props.data.language}
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
              data={props.data.currency}
            ></AccordionItemObjectDataType>
          </AccordionItem>
        </Accordion>
        <br />
        <a
          href={props.data.advise?.CA?.url}
          className="card-link"
          target="_blank"
          rel="noreferrer"
        >
          Official website
        </a>
      </div>
    </div>
  );
}

export default CountryInfo;
