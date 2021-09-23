import axios from "axios";

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

  getIconCategories() {
    return this.#iconCategory;
  }

  initializeIcons() {
    this.#iconCategory = new Map();
    this.#iconCategory.set("shop", "bi-shop");
    this.#iconCategory.set("shopping_center", "bi-cart3");
    this.#iconCategory.set("store", "bi-shop-window");
    this.#iconCategory.set("museum", "bi-palette");
    this.#iconCategory.set("food", "bi-egg-fried");
    this.#iconCategory.set("restaurant", "bi-egg-fried");
    this.#iconCategory.set("building", "bi-building");
    this.#iconCategory.set("park", "bi-tree");
    this.#iconCategory.set("health", "bi-suit-heart");
    this.#iconCategory.set("gym", "bi-bicycle");
    this.#iconCategory.set("lodging", "bi-house");
    this.#iconCategory.set("school", "bi-vector-pen");
    this.#iconCategory.set("church", "bi-bank");
    this.#iconCategory.set("place_of_worship", "bi-bank");
    this.#iconCategory.set("university", "bi-people");
    this.#iconCategory.set("cafe", "bi-cup");
    this.#iconCategory.set("bar", "bi-cup-straw");
    this.#iconCategory.set("tourist_attraction", "bi-bookmark-star");
    this.#iconCategory.set("hairdressing_salon", "bi-scissors");
    this.#iconCategory.set("beauty_salon", "bi-scissors");
    this.#iconCategory.set("cinema", "bi-camera-reels");
    this.#iconCategory.set("car_dealer", "bi-truck");
    this.#iconCategory.set("art_gallery", "bi-easel");
    this.#iconCategory.set("government_office", "bi-receipt-cutoff");
    this.#iconCategory.set("real_estate_agency", "bi-receipt-cutoff");
    this.#iconCategory.set("transit_station", "bi-stoplights");
    this.#iconCategory.set("finance", "bi-cash-coin");
    this.#iconCategory.set("jewelry_store", "bi-gem");
    this.#iconCategory.set("cemetery", "bi-file-break-fill");
    this.#iconCategory.set("pharmacy", "bi-bookmark-heart");
    this.#iconCategory.set("travel_agency", "bi-signpost-split");
    this.#iconCategory.set("bakery", "bi-basket");
    this.#iconCategory.set("electronics_store", "bi-headset");
    this.#iconCategory.set("home_goods_store", "bi-music-player");
    this.#iconCategory.set("night_club", "bi-music-note-list");
    this.#iconCategory.set("car_rental", "bi-truck");
    this.#iconCategory.set("storage", "bi-house-door");
  }
}

const MapManager = new MapManagement();
MapManager.initializeIcons();
export default MapManager;
