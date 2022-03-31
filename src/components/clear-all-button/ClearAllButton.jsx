import styles from "./ClearAllButton.module.css";
import PropTypes from "prop-types";
import { Chip } from "components";

export const ClearAllButton = ({ loading, onClick, textToShow }) => {
  return loading ? (
    <div className="chip-container">
      <Chip loading={true} className="ml-auto mr-1" />
    </div>
  ) : (
    <div className="chip-container">
      <Chip
        textToShow={textToShow || "Clear All"}
        activeChip={textToShow || "Clear All"}
        onClick={onClick}
        className={`ml-auto mr-1 ${styles.clearAll_btn}`}
      />
    </div>
  );
};

ClearAllButton.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  textToShow: PropTypes.string,
};

ClearAllButton.defaultProps = {
  loading: false,
  onClick: () => {},
  textToShow: "",
};
