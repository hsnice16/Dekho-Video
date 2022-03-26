import styles from "./Chip.module.css";
import PropTypes from "prop-types";

export const Chip = ({ textToShow, activeChip, handleChipClick, loading }) => {
  return loading ? (
    <span className={`inline-block mx-1 px-1 py-0p5 ${styles.Chip}`}></span>
  ) : (
    <span
      className={`cursor-ptr fw-bold inline-block mx-1 px-1 py-0p5 text-center ${
        styles.Chip
      } ${activeChip === textToShow ? styles.ActiveChip : ""}`}
      onClick={handleChipClick}
    >
      {textToShow}
    </span>
  );
};

Chip.propTypes = {
  textToShow: PropTypes.string,
  activeChip: PropTypes.string,
  handleChipClick: PropTypes.func,
  loading: PropTypes.bool,
};

Chip.defaultProps = {
  textToShow: "",
  activeChip: "",
  handleChipClick: () => {},
  loading: false,
};
