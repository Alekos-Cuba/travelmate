const nearbyPlacesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_NEARBY_PLACES": {
      state = [...action.payload];
      return state;
    }
    case "CLEAR_NEARBY_PLACES": {
      state = [];
      return state;
    }
    default:
      return state;
  }
};

export default nearbyPlacesReducer;
