import { combineReducers } from "redux";
import countryReducer from "./countryReducer";
import mapCenterReducer from "./mapCenterReducer";
import nearbyPlacesReducer from "./nearbyPlacesReducer";

const allReducers = combineReducers({
  countries: countryReducer,
  mapCenter: mapCenterReducer,
  nearbyPlaces: nearbyPlacesReducer,
});

export default allReducers;
