function DetailsCard({ children }) {
  return (
    <div className="position-absolute d-flex flex-row justify-content-center align-items-center w-100 vh-100">
      {children}
    </div>
  );
}

export default DetailsCard;
