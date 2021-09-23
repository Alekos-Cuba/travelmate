export const setNearbyPlaces = (places) => {
  return {
    type: "SET_NEARBY_PLACES",
    payload: places,
  };
};

export const clearNearbyPlaces = () => {
  return {
    type: "CLEAR_NEARBY_PLACES",
  };
};
