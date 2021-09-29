const defaultState = [
  {
    type: "Polygon",
    coordinates: [],
  },
];

const boundaryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_BOUNDARY": {
      state = [...action.payload];
      return state;
    }
    default:
      return state;
  }
};

export default boundaryReducer;
