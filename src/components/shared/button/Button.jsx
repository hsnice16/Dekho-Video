import styles from "./Button.module.css";
import PropTypes from "prop-types";

export const Button = ({ children, className, onClick }) => (
  <button className={`${styles.button} ${className}`} onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: <></>,
  className: "",
  onClick: () => {},
};
