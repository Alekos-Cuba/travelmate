class APIProviderClass {
  #dataAPI;
  #defaultAPI = {
    mapTiles: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    countryList: "https://travelbriefing.org/countries.json",
    nearbyPlaces: "https://trueway-places.p.rapidapi.com/FindPlacesNearby",
    weather: "https://weatherapi-com.p.rapidapi.com/current.json",
  };

  constructor() {
    this.#dataAPI = new Map();
    for (const key of Object.keys(this.#defaultAPI)) {
      this.#dataAPI.set(key.toString(), this.#defaultAPI[key]);
    }
  }

  addAPI(name, url) {
    this.#dataAPI.set(name, url);
  }

  getAPIbyName(name) {
    if (this.#dataAPI.get(name)) {
      return this.#dataAPI.get(name);
    } else {
      throw Error(`No API with name ${name} found`);
    }
  }

  getAvailableAPI() {
    return this.#dataAPI.keys();
  }
}

const APIProvider = new APIProviderClass();
export default APIProvider;
