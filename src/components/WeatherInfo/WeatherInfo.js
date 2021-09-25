import IconProvider from "../../scripts/IconProvider";

const WeatherInfo = ({ data, onModalClose }) => {
  const { location, current: weather } = data;

  return (
    <div className="card modal-fitcontent">
      <div className="card-header bg-dark text-white d-flex flex-row justify-content-between">
        <span>{`${location.region} (${location.country})`}</span>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={onModalClose}
        ></button>
      </div>
      <div className="card-body d-flex flex-column">
        <span>
          <img
            src={`https://${weather.condition.icon}`}
            alt={weather.condition.text}
          />
          {weather.condition.text}
        </span>
        <span>
          <i className={`bi ${IconProvider.getIconByName("clock")} me-2`} />
          Local time: {location.localtime}
        </span>
        <span>
          <i
            className={`bi ${IconProvider.getIconByName("temperature")} me-2`}
          />
          Temperature (C): {weather.temp_c}°
        </span>
        <span>
          <i className={`bi ${IconProvider.getIconByName("moisture")} me-2`} />
          Humidity: {weather.humidity}%
        </span>
        <span>
          <i className={`bi ${IconProvider.getIconByName("wind")} me-2`} />
          Wind speed: {weather.wind_kph}kph
        </span>
      </div>
    </div>
  );
};

export default WeatherInfo;
