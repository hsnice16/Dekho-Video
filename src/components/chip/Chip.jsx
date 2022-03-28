import styles from "./Chip.module.css";
import PropTypes from "prop-types";

export const Chip = ({
  textToShow,
  activeChip,
  handleChipClick,
  loading,
  className,
}) => {
  return loading ? (
    <span
      className={`h-3p5 inline-block mx-1 px-1 py-0p5 ${className} ${styles.chip}`}
    ></span>
  ) : (
    <button
      className={`fs-1p5 inline-block mx-1 px-1 py-0p5 ${className} ${
        styles.chip
      } ${activeChip === textToShow ? styles.chip_active : ""}`}
      onClick={handleChipClick}
    >
      {textToShow}
    </button>
  );
};

Chip.propTypes = {
  textToShow: PropTypes.string,
  activeChip: PropTypes.string,
  handleChipClick: PropTypes.func,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

Chip.defaultProps = {
  textToShow: "",
  activeChip: "",
  handleChipClick: () => {},
  loading: false,
  className: "",
};
