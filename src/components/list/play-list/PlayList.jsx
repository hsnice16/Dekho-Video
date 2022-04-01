import styles from "../List.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";
import { PlaylistCard } from "components";
import { getEmptyArrayOfObjects } from "utils";

export const PlayList = ({ playlists, status, className }) => {
  return (
    <ul className={classNames(className, styles.list, styles.list_play)}>
      {status === "loading" &&
        getEmptyArrayOfObjects(4).map(({ _id }) => (
          <li key={_id}>
            <PlaylistCard loading={true} />
          </li>
        ))}

      {status === "success" &&
        playlists.map((playlist) => (
          <li key={playlist._id}>
            <PlaylistCard playlist={playlist} />
          </li>
        ))}
    </ul>
  );
};

PlayList.propTypes = {
  playlists: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      description: PropTypes.string,
      title: PropTypes.string,
      videos: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string,
          categoryName: PropTypes.string,
          creator: PropTypes.string,
          creatorLogo: PropTypes.shape({
            altText: PropTypes.string,
            url: PropTypes.string,
          }),
          isInWatchLater: PropTypes.bool,
          isLiked: PropTypes.bool,
          thumbnail: PropTypes.shape({
            altText: PropTypes.string,
            url: PropTypes.string,
          }),
          title: PropTypes.string,
          description: PropTypes.string,
          videoYTId: PropTypes.string,
        })
      ),
    })
  ),
  status: PropTypes.string,
  className: PropTypes.string,
};

PlayList.defaultProps = {
  playlists: [
    {
      _id: "",
      description: "",
      title: "",
      videos: [
        {
          _id: "",
          categoryName: "",
          creator: "",
          creatorLogo: {
            altText: "",
            url: "",
          },
          isInWatchLater: false,
          isLiked: false,
          thumbnail: {
            altText: "",
            url: "",
          },
          title: "",
          description: "",
          videoYTId: "",
        },
      ],
    },
  ],
  status: "",
  className: "",
};
