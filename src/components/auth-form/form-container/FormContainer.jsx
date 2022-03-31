import styles from "./FormContainer.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";

const FormContainer = ({ children, handleSubmit, className }) => (
  <form
    onSubmit={handleSubmit}
    className={classNames(
      "form",
      "m-auto",
      "p-2",
      "shadow-unset",
      className,
      styles.formContainer
    )}
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
