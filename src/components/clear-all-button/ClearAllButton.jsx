import styles from "./ClearAllButton.module.css";
import PropTypes from "prop-types";
import { Chip } from "components";

export const ClearAllButton = ({ loading, onClick }) => {
  return loading ? (
    <div className="chip-container">
      <Chip loading={true} className="ml-auto mr-1" />
    </div>
  ) : (
    <div className="chip-container">
      <Chip
        textToShow="Clear All"
        activeChip="Clear All"
        onClick={onClick}
        className={`ml-auto mr-1 ${styles.clearAll_btn}`}
      />
    </div>
  );
};

ClearAllButton.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

ClearAllButton.defaultProps = {
  loading: false,
  onClick: () => {},
};
