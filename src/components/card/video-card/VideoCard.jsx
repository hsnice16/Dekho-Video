import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import styles from "./VideoCard.module.css";
import PropTypes from "prop-types";
import { useOptionsList } from "context";
import { ROUTE_WATCH_VIDEO } from "utils";

export const VideoCard = ({ video, loading }) => {
  const navigate = useNavigate();
  const { showOptionsListForVideo, toggleShowOptionsList, getOptionsList } =
    useOptionsList();
  const {
    creator,
    creatorLogo,
    thumbnail,
    title,
    isInWatchLater,
    isLiked,
    videoYTId,
    _id,
  } = video;
  const optionsList = getOptionsList(isInWatchLater, isLiked);

  const handleOverlayPlayClick = () => {
    navigate(`${ROUTE_WATCH_VIDEO}/${_id}`);
  };

  const handleKeyDownOnOverlayPlay = (event) => {
    if (event.key === "Enter") handleOverlayPlayClick();
  };

  return loading ? (
    <div
      className={`card card-vertical shadow-unset ${styles.videoCard_loading} ${styles.videoCard}`}
    >
      <span className="card-vertical-img w-100pct"></span>

      <div className="card-text-overlay-row px-0">
        <span className="card-horizontal-img shadow-unset"></span>
        <span className="card-head h-3p5 mt-0p5 w-6p5"></span>
      </div>
    </div>
  ) : (
    <div className={`card card-vertical shadow-unset ${styles.videoCard}`}>
      <div
        className="card-text-overlay"
        onClick={handleOverlayPlayClick}
        onKeyDown={handleKeyDownOnOverlayPlay}
        tabIndex="0"
      >
        <img
          loading="lazy"
          className="card-vertical-img"
          src={thumbnail.url}
          alt={thumbnail.altText}
        />

        <span
          className={`card-vertical-img overlay-content ${styles.overlayContent}`}
        >
          <FaPlay className="overlay-play-icon" /> Play
        </span>
      </div>

      <div className="card-text-overlay-row justify-c-sb px-0">
        <img
          loading="lazy"
          className="card-horizontal-img shadow-unset"
          src={creatorLogo.url}
          alt={creatorLogo.altText}
        />

        <div>
          <h2 className="card-head fs-1p5 lh-1p5 mt-0p5">{title}</h2>
          <p className="card-text fs-1p5">{creator}</p>
        </div>

        <button
          className={`cursor-ptr flex mt-0p5 relative ${styles.dotsIcon_btn} ${
            showOptionsListForVideo === videoYTId
              ? styles.optionsList_isVisible
              : ""
          }`}
          onClick={(event) => {
            toggleShowOptionsList(event, videoYTId);
          }}
        >
          <HiDotsVertical className="fs-2 m-auto" />

          {showOptionsListForVideo === videoYTId && (
            <ul className="absolute border-r-0p2 fs-1p5 p-0p5 text-left">
              {optionsList.map(({ _id, option, handleClick, GetIcon }) => (
                <li
                  key={_id}
                  onClick={() => {
                    handleClick(video._id, video);
                  }}
                  className="align-i-fs border-r-0p2 flex my-0p5 p-0p5"
                >
                  <GetIcon className={styles.listIcon} /> {option}
                </li>
              ))}
            </ul>
          )}
        </button>
      </div>
    </div>
  );
};

VideoCard.propTypes = {
  video: PropTypes.shape({
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
  }),
  loading: PropTypes.bool,
};

VideoCard.defaultProps = {
  video: {
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
  loading: false,
};
