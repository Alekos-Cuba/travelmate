class MapManagement {
  #currentState;
  constructor() {
    this.STATES = {
      NONE: 0,
      ADD_MARKER: 1,
      SET_MARKER_INFO: 2,
    };
    this.ICON_TYPES = new Map();
    this.#currentState = this.STATES.NONE;
    if (this.instance === null) {
      MapManagement.instance = this;
    }
    return MapManagement.instance;
  }

  initialize() {
    this.ICON_TYPES.set("SHOP", { type: 0, name: "shop" });
    this.ICON_TYPES.set("MARKER", { type: 1, name: "geo-alt-fill" });
  }

  getCurrentState() {
    return this.#currentState;
  }

  setCurrentState(state) {
    this.#currentState = state;
  }

  createMarker() {
    let me = this === undefined ? MapManager : this;
    me.#currentState = me.STATES.ADD_MARKER;
  }

  disableMapControls(map) {
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    if (map.tap) {
      map.tap.disable();
    }
  }

  enableMapControls(map) {
    map.dragging.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
    if (map.tap) {
      map.tap.enable();
    }
  }
}

const MapManager = new MapManagement();
MapManager.initialize();
export default MapManager;
