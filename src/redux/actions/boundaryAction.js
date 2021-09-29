export const setBoundary = (boundaryGeoJSON) => {
  return {
    type: "SET_BOUNDARY",
    payload: boundaryGeoJSON,
  };
};
