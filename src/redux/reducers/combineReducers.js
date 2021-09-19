import countryReducer from "./countryReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  countries: countryReducer,
});

export default allReducers;
