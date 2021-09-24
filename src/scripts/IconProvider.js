class IconProviderClass {
  #icons;

  constructor() {
    this.#icons = new Map();
    this.#icons.set("shop", "bi-shop");
    this.#icons.set("shopping_center", "bi-cart3");
    this.#icons.set("store", "bi-shop-window");
    this.#icons.set("museum", "bi-palette");
    this.#icons.set("food", "bi-egg-fried");
    this.#icons.set("restaurant", "bi-egg-fried");
    this.#icons.set("building", "bi-building");
    this.#icons.set("park", "bi-tree");
    this.#icons.set("health", "bi-suit-heart");
    this.#icons.set("doctor", "bi-suit-heart");
    this.#icons.set("gym", "bi-bicycle");
    this.#icons.set("lodging", "bi-house");
    this.#icons.set("school", "bi-vector-pen");
    this.#icons.set("church", "bi-bank");
    this.#icons.set("place_of_worship", "bi-bank");
    this.#icons.set("university", "bi-people");
    this.#icons.set("cafe", "bi-cup");
    this.#icons.set("bar", "bi-cup-straw");
    this.#icons.set("tourist_attraction", "bi-bookmark-star");
    this.#icons.set("hairdressing_salon", "bi-scissors");
    this.#icons.set("beauty_salon", "bi-scissors");
    this.#icons.set("cinema", "bi-camera-reels");
    this.#icons.set("car_dealer", "bi-truck");
    this.#icons.set("art_gallery", "bi-easel");
    this.#icons.set("government_office", "bi-receipt-cutoff");
    this.#icons.set("real_estate_agency", "bi-receipt-cutoff");
    this.#icons.set("transit_station", "bi-stoplights");
    this.#icons.set("finance", "bi-cash-coin");
    this.#icons.set("jewelry_store", "bi-gem");
    this.#icons.set("cemetery", "bi-file-break-fill");
    this.#icons.set("pharmacy", "bi-bookmark-heart");
    this.#icons.set("travel_agency", "bi-signpost-split");
    this.#icons.set("bakery", "bi-basket");
    this.#icons.set("electronics_store", "bi-headset");
    this.#icons.set("home_goods_store", "bi-music-player");
    this.#icons.set("night_club", "bi-music-note-list");
    this.#icons.set("car_rental", "bi-truck");
    this.#icons.set("storage", "bi-house-door");
    this.#icons.set("binoculars", "bi-binoculars-fill");
    this.#icons.set("weather", "bi-thermometer-sun");
    this.#icons.set("search", "bi-search");
  }

  getAll() {
    return this.#icons;
  }

  getIconByName(name) {
    return this.#icons.get(name);
  }
}

const IconProvider = new IconProviderClass();
export default IconProvider;
