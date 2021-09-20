const ReadOnlyInput = ({ id, type, value, label }) => {
  return (
    <>
      <label className="mt-2" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="form-control"
        type={type}
        aria-label="readonly input example"
        value={value}
        readonly
        disabled
      ></input>
    </>
  );
};

export default ReadOnlyInput;
