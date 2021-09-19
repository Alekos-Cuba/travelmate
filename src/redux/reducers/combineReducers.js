import { combineReducers } from "redux";
import countryReducer from "./countryReducer";
import mapReducer from "./mapReducer";

const allReducers = combineReducers({
  countries: countryReducer,
  map: mapReducer,
});

export default allReducers;
