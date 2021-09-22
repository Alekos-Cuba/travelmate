const mapCenterReducer = (state = { lat: 0, lng: 0 }, action) => {
  switch (action.type) {
    case "SET_MAP_CENTER": {
      state = { ...action.payload };
      return state;
    }
    default:
      return state;
  }
};

export default mapCenterReducer;
