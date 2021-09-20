import { combineReducers } from "redux";
import countryReducer from "./countryReducer";
import mapCenterReducer from "./mapCenterReducer";

const allReducers = combineReducers({
  countries: countryReducer,
  mapCenter: mapCenterReducer,
});

export default allReducers;
