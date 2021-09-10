import axios from "axios";

class MapManagement {
  #currentAction;
  #map;
  constructor() {
    this.ACTIONS = {
      NONE: 0,
      ADD_MARKER: 1,
      SET_MARKER_INFO: 2,
      SHOW_MARKER_INFO: 3,
    };
    this.ICON_TYPES = new Map();
    this.#currentAction = this.ACTIONS.NONE;
    if (this.instance === null) {
      MapManagement.instance = this;
    }
    return MapManagement.instance;
  }

  initialize() {
    this.ICON_TYPES.set("SHOP", { type: 0, name: "shop" });
    this.ICON_TYPES.set("MARKER", { type: 1, name: "geo-alt" });
    this.ICON_TYPES.set("CATEGORY", { type: 2, name: "tags" });
    this.ICON_TYPES.set("SETTINGS", { type: 3, name: "gear" });
    this.ICON_TYPES.set("DATA", { type: 4, name: "file-earmark-bar-graph" });
    this.ICON_TYPES.set("MARKER-PIN", { type: 5, name: "geo" });
  }

  getCurrentAction() {
    return this.#currentAction;
  }

  setCurrentAction(state) {
    this.#currentAction = state;
  }

  getMap() {
    return this.#map;
  }

  setMap(map) {
    this.#map = map;
  }

  disableMapControls() {
    this.#map.dragging.disable();
    this.#map.touchZoom.disable();
    this.#map.doubleClickZoom.disable();
    this.#map.scrollWheelZoom.disable();
    this.#map.boxZoom.disable();
    this.#map.keyboard.disable();
    if (this.#map.tap) {
      this.#map.tap.disable();
    }
  }

  enableMapControls() {
    this.#map.dragging.enable();
    this.#map.touchZoom.enable();
    this.#map.doubleClickZoom.enable();
    this.#map.scrollWheelZoom.enable();
    this.#map.boxZoom.enable();
    this.#map.keyboard.enable();
    if (this.#map.tap) {
      this.#map.tap.enable();
    }
  }

  async getCountries() {
    try {
      const countries = await axios.get(
        "https://travelbriefing.org/countries.json"
      );
      return countries;
    } catch (err) {
      return { errorMessage: err.message };
    }
  }

  async getCountryInfo(url) {
    try {
      const countryInfo = await axios.get(url);
      return countryInfo;
    } catch (err) {
      return { errorMessage: err.message };
    }
  }
}

const MapManager = new MapManagement();
MapManager.initialize();
export default MapManager;
