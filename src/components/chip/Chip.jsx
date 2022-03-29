import styles from "./Chip.module.css";
import PropTypes from "prop-types";

export const Chip = ({
  textToShow,
  activeChip,
  onClick,
  loading,
  className,
}) => {
  return loading ? (
    <span
      className={`h-3p5 inline-block px-1 py-0p5 ${className} ${styles.chip}`}
    ></span>
  ) : (
    <button
      className={`fs-1p5 inline-block px-1 py-0p5 ${className} ${styles.chip} ${
        activeChip === textToShow ? styles.chip_active : ""
      }`}
      onClick={onClick}
    >
      {textToShow}
    </button>
  );
};

Chip.propTypes = {
  textToShow: PropTypes.string,
  activeChip: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

Chip.defaultProps = {
  textToShow: "",
  activeChip: "",
  onClick: () => {},
  loading: false,
  className: "",
};
