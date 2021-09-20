const mapCenterReducer = (state = {}, action) => {
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
