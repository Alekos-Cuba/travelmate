import styles from "./../../css/nearbyPlacesSearchResult.module.css";
import UID from "../../scripts/IdGenerator";
import { useSelector } from "react-redux";
import NearbyPlaceCard from "./NearbyPlaceCard";

const NearbyPlacesSearchResults = () => {
  const nearbyPlaces = useSelector((state) => state.nearbyPlaces);

  const renderNearbyPlaces = () => {
    let placesToRender = [];
    if (nearbyPlaces.length === 0) {
      placesToRender.push(<span key={UID.next().value}>No places nearby</span>);
    }
    nearbyPlaces.forEach((place) => {
      placesToRender.push(<NearbyPlaceCard key={place.id} data={place} />);
    });
    return placesToRender;
  };

  return (
    <>
      <div className={`container mt-4 ${styles.placesContainer}`}>
        <div className="container-body">{renderNearbyPlaces()}</div>
      </div>
    </>
  );
};

export default NearbyPlacesSearchResults;
