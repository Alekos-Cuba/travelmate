const ReadOnlyInput = ({ input, label }) => {
  return (
    <>
      <label className="mt-2" htmlFor={input.id}>
        {label}
      </label>
      <input
        {...input}
        aria-label="readonly input"
        className="form-control"
        readOnly
        disabled
      ></input>
    </>
  );
};

export default ReadOnlyInput;
