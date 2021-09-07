class MapManagement {
  constructor() {
    this.STATES = {
      NONE: 0,
      SELECTING: 1,
    };
    this.currentState = this.STATES.NONE;
    if (this.instance === null) {
      MapManagement.instance = this;
    }
    return MapManagement.instance;
  }

  createMarker() {
    let me = this === undefined ? MapManager : this;
    console.log(me);
    if (me.currentState === me.STATES.NONE) {
      me.currentState = me.STATES.SELECTING;
    }
  }
}

const MapManager = new MapManagement();
export default MapManager;
