import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./FormPasswordInput.module.css";
import PropTypes from "prop-types";
import { isInputTypePassword } from "utils";

const FormPasswordInput = ({ name, id, value, handleChange }) => {
  const [inputType, setInputType] = useState("password");

  const changeInputType = () => {
    setInputType((prevInputType) =>
      isInputTypePassword(prevInputType) ? "text" : "password"
    );
  };

  return (
    <div
      className={`bg-unset border-r-0p2 flex input mx-0 p-0 w-100pct ${styles.PasswordDiv}`}
    >
      <input
        className="bg-unset border-none input m-0 pr-0"
        type={inputType}
        name={name}
        id={id}
        placeholder={isInputTypePassword(inputType) ? "********" : name}
        value={value}
        onChange={handleChange}
      />

      <button
        type="button"
        className="bg-unset border-none px-0p5"
        onClick={changeInputType}
      >
        {isInputTypePassword(inputType) ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

FormPasswordInput.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};

FormPasswordInput.defaultProps = {
  name: "",
  id: "",
  value: "",
  handleChange: () => {},
};

export { FormPasswordInput };
