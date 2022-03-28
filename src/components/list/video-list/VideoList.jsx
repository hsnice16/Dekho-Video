import styles from "./VideoList.module.css";
import PropTypes from "prop-types";
import { VideoCard } from "components";
import { getEmptyArrayOfObjects } from "utils";

export const VideoList = ({ videos, status, className }) => {
  return (
    <ul className={`${className} ${styles.videoList}`}>
      {status === "loading" &&
        getEmptyArrayOfObjects(4).map(({ _id }) => (
          <li key={_id}>
            <VideoCard loading={true} />
          </li>
        ))}

      {status === "success" &&
        videos.map((video) => (
          <li key={video._id}>
            <VideoCard video={video} />
          </li>
        ))}
    </ul>
  );
};

VideoList.propTypes = {
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
  status: PropTypes.string,
  className: PropTypes.string,
};

VideoList.defaultProps = {
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
  status: "",
  className: "",
};
