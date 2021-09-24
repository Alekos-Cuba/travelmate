class MapManagement {
  #map;
  #iconCategory;
  constructor() {
    if (this.instance === null) {
      MapManagement.instance = this;
    }
    return MapManagement.instance;
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
}

const MapManager = new MapManagement();
export default MapManager;
