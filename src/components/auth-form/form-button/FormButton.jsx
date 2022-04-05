import styles from "./FormButton.module.css";
import classNames from "classnames";
import { FaDoorOpen } from "react-icons/fa";
import PropTypes from "prop-types";
import { spinner5 } from "assets";
import { isStatusLoading } from "utils";

const FormButton = ({ buttonText, status, onClick }) => (
  <button
    onClick={onClick}
    disabled={isStatusLoading(status)}
    className={classNames(
      "btn",
      "fw-bold",
      "mx-0",
      "w-100pct",
      styles.btnForm,
      isStatusLoading(status) ? styles.btnForm_loading : ""
    )}
  >
    {isStatusLoading(status) ? (
      <>
        <img src={spinner5} alt="loading spinner, gif" />
        Loading...
      </>
    ) : (
      <>
        {buttonText === "Log In" && (
          <>
            <FaDoorOpen className="fs-1p5" />{" "}
          </>
        )}
        {buttonText}
      </>
    )}
  </button>
);

FormButton.propTypes = {
  buttonText: PropTypes.string,
  status: PropTypes.string,
  onClick: PropTypes.func,
};

FormButton.defaultProps = {
  buttonText: "",
  status: "",
  onClick: () => {},
};

export { FormButton };
