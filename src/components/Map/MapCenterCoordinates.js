import { useState } from "react";
import { useSelector } from "react-redux";
import { useMapEvents } from "react-leaflet";

const MapCenterCoordinates = () => {
  const mapCenter = useSelector((state) => state.mapCenter);
  const [centerCoords, setCenterCoords] = useState(mapCenter);

  const map = useMapEvents({
    move() {
      const { lat, lng } = map.getCenter();
      setCenterCoords({ lat: lat.toFixed(3), lng: lng.toFixed(3) });
    },
  });

  return (
    <div className="card">
      <div className="card-header bg-dark text-white">Map center</div>
      <div className="card-body bg-secondary d-flex flex-column text-white">
        <div className="d-flex flex-row justify-content-between">
          <span>Latitude:</span>
          <span className="ms-2 text-info">{centerCoords.lat}</span>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <span>Longitude:</span>
          <span className="ms-2 text-info">{centerCoords.lng}</span>
        </div>
      </div>
    </div>
  );
};

export default MapCenterCoordinates;
