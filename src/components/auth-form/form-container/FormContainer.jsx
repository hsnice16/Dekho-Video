import PropTypes from "prop-types";
import styles from "./FormContainer.module.css";

const FormContainer = ({ children, handleSubmit, className }) => (
  <form
    onSubmit={handleSubmit}
    className={`form m-auto p-2 shadow-unset ${className} ${styles.FormContainer}`}
  >
    {children}
  </form>
);

FormContainer.propTypes = {
  children: PropTypes.node,
  handleSubmit: PropTypes.func,
  className: PropTypes.string,
};

FormContainer.defaultProps = {
  children: [],
  handleSubmit: () => {},
  className: "",
};

export { FormContainer };
