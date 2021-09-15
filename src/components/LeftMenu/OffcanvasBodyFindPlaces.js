import MapManager from "../../scripts/MapManager";

const OffcanvasBodyFindPlaces = (props) => {
  //const { lat, lng } = MapManager.getMap().options.center;

  return (
    <>
      <div className="container">
        <form>
          <label htmlFor="latInput">Latitude</label>
          <input
            id="latInput"
            className="form-control"
            type="text"
            aria-label="readonly input example"
            readonly
            disabled
          ></input>
        </form>
        <form>
          <label>Longitude</label>
          <input
            className="form-control"
            type="text"
            aria-label="readonly input example"
            readOnly
            disabled
          ></input>
        </form>
      </div>
    </>
  );
};

export default OffcanvasBodyFindPlaces;
