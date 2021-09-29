import { combineReducers } from "redux";
import countryReducer from "./countryReducer";
import mapCenterReducer from "./mapCenterReducer";
import nearbyPlacesReducer from "./nearbyPlacesReducer";
import boundaryReducer from "./boundaryReducer";

const allReducers = combineReducers({
  countries: countryReducer,
  mapCenter: mapCenterReducer,
  nearbyPlaces: nearbyPlacesReducer,
  boundary: boundaryReducer,
});

export default allReducers;
