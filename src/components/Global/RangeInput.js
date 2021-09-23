import { useState } from "react";

const RangeInput = ({ label, input, onRangeChange }) => {
  const [value, setValue] = useState(input.defaultValue);

  const inputChangeHandler = (e) => {
    setValue(e.target.value);
    onRangeChange?.(e.target.value);
  };

  return (
    <>
      <label className="mt-2" htmlFor={input.id}>
        {label}
      </label>
      <div className="d-flex flex-row">
        <input
          className="flex-grow-1"
          type="range"
          {...input}
          onChange={inputChangeHandler}
        ></input>
        <span>{value}</span>
      </div>
    </>
  );
};

export default RangeInput;
