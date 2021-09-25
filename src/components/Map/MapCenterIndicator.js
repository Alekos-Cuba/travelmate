import IconProvider from "../../scripts/IconProvider";

const MapCenterIndicator = () => {
  return (
    <div
      className={`bi ${IconProvider.getIconByName("plus")} z-index-550
      } position-absolute top-50 start-50 translate-middle`}
    ></div>
  );
};

export default MapCenterIndicator;
