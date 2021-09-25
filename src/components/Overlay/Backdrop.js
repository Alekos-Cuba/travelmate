const Backdrop = ({ children }) => {
  return (
    <div
      className={`position-absolute 
          d-flex justify-content-center align-items-center 
          h-100 w-100 
          bg-dark opacity-75 z-index-550`}
    >
      {children}
    </div>
  );
};

export default Backdrop;
