import styles from "../List.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";
import { PlaylistCard } from "components";
import { getEmptyArrayOfObjects } from "utils";

export const PlayList = ({ className }) => {
  return (
    <ul className={classNames(className, styles.list, styles.list_play)}>
      {getEmptyArrayOfObjects(4).map(({ _id }) => (
        <li key={_id}>
          <PlaylistCard />
        </li>
      ))}
    </ul>
  );
};

PlayList.propTypes = {
  className: PropTypes.string,
};

PlayList.defaultProps = {
  className: "",
};
