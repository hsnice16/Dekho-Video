import { Link } from "react-router-dom";
import styles from "./FormError.module.css";
import PropTypes from "prop-types";

const FormError = ({ error, linkTo, onPage }) => {
  return (
    <div
      className={`alert alert-danger-solid m-auto mb-2 text-center ${
        onPage === "SignIn" ? "w-33" : ""
      } max-w-45`}
    >
      {onPage === "SignUp" &&
        (error === "Email Already Exist" ? (
          <>
            Email Id is already registered. Please{" "}
            <Link to={linkTo} className={styles.FormErrorLink}>
              Log In
            </Link>
          </>
        ) : (
          error
        ))}

      {onPage === "SignIn" &&
        (error === "Not Registered Email" ? (
          <>
            Email Id is not registered. Please{" "}
            <Link to={linkTo} className={styles.FormErrorLink}>
              Sign Up
            </Link>{" "}
            first
          </>
        ) : (
          error
        ))}
    </div>
  );
};

FormError.propTypes = {
  error: PropTypes.string,
  linkTo: PropTypes.string,
  onPage: PropTypes.string,
};

FormError.defaultProps = {
  error: "",
  linkTo: "",
  onPage: "",
};

export { FormError };
