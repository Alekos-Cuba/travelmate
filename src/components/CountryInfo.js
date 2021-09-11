import "./../css/countryInfo.css";
import Accordion from "./Accordion";
import AccordionItem from "./AccordionItem";
import AccordionItemEmergencyPhone from "./AccordionItemEmergencyPhone";
import AccordionItemNeighbors from "./AccordionItemNeighbors";

function CountryInfo(props) {
  console.log(props);
  return (
    <div className="card text-white bg-dark mb-3 country-info">
      <div className="card-body">
        <h5 className="card-title">{props.data.names.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {`${props.data.names.full} (Continent: ${props.data.names.continent})`}
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
            <AccordionItemEmergencyPhone
              data={props.data.neighbors}
            ></AccordionItemEmergencyPhone>
          </AccordionItem>
        </Accordion>
        <a
          href={props.data.advise.CA.url}
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
