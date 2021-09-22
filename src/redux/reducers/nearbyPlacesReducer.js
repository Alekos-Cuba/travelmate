const nearbyPlacesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_NEARBY_PLACES": {
      state = [...action.payload];
      return state;
    }
    default:
      return state;
  }
};

export default nearbyPlacesReducer;
