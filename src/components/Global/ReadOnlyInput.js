const ReadOnlyInput = ({ input, label, ariaLabel }) => {
  return (
    <>
      <label className="mt-2" htmlFor={input.id}>
        {label}
      </label>
      <input
        {...input}
        aria-label={ariaLabel}
        className="form-control"
        readOnly
        disabled
      ></input>
    </>
  );
};

export default ReadOnlyInput;
