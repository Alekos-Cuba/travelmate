import styles from "./../../css/nearbyPlacesSearchResult.module.css";
import { useSelector } from "react-redux";
import NearbyPlaceCard from "./NearbyPlaceCard";

const NearbyPlacesSearchResults = () => {
  const nearbyPlaces = useSelector((state) => state.nearbyPlaces);

  return (
    <>
      <div className={`container mt-4 ${styles.placesContainer}`}>
        <div className="container-body">
          {nearbyPlaces.map((place) => {
            return <NearbyPlaceCard key={place.id} data={place} />;
          })}
        </div>
      </div>
    </>
  );
};

export default NearbyPlacesSearchResults;
