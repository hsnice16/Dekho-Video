import styles from "./PlaylistCard.module.css";
import cardStyles from "../Card.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { magicBox, PlaylistPlayIcon } from "assets";
import { ROUTE_PLAYLIST } from "utils";

export const PlaylistCard = ({ playlist, loading }) => {
  const navigate = useNavigate();
  const { title, _id } = playlist;
  const playlistVideosLength = playlist.videos.length;

  const handleOverlayPlayAllClick = () => {
    if (playlistVideosLength > 0)
      navigate(`${ROUTE_PLAYLIST}/${_id}/watch/v/${playlist.videos[0]._id}`);
  };

  const handleKeyDownOnOverlayPlayAll = (event) => {
    if (event.key === "Enter") handleOverlayPlayAllClick();
  };

  return loading ? (
    <div
      className={classNames(
        "card",
        "card-vertical",
        "shadow-unset",
        cardStyles.card,
        styles.playlistCard_loading
      )}
    >
      <span className="card-vertical-img"></span>
      <span className="card-head h-3p5 mt-0p5 mx-0 w-6p5"></span>
    </div>
  ) : (
    <div
      className={classNames(
        "card",
        "card-vertical",
        "shadow-unset",
        cardStyles.card,
        styles.playlistCard
      )}
    >
      <div
        className="card-text-overlay"
        onClick={handleOverlayPlayAllClick}
        onKeyDown={handleKeyDownOnOverlayPlayAll}
        tabIndex="0"
      >
        <img
          loading="lazy"
          className="block card-vertical-img"
          src={
            playlistVideosLength > 0
              ? playlist.videos[0].thumbnail.url
              : magicBox
          }
          alt={
            playlistVideosLength > 0
              ? playlist.videos[0].thumbnail.altText
              : "Playlist is empty"
          }
        />

        <span
          className={classNames(
            "absolute",
            "align-i-ctr",
            "flex",
            "flex-direction-col",
            "fw-bold",
            "h-100pct",
            "justify-c-ctr",
            styles.videoCount_playlist
          )}
        >
          {playlistVideosLength} <PlaylistPlayIcon />
        </span>

        {playlistVideosLength > 0 && (
          <span
            className={classNames(
              "h-100pct",
              "overlay-content",
              "w-100pct",
              cardStyles.overlayContent
            )}
          >
            <FaPlay className="overlay-play-icon" /> Play All
          </span>
        )}
      </div>

      <h2 className="card-head fs-1p5 mx-0 my-0p5">{title}</h2>
      {playlistVideosLength > 0 && (
        <Link to={`${ROUTE_PLAYLIST}/${_id}`} className="card-text fs-1p5 m-0">
          View Full Playlist
        </Link>
      )}
    </div>
  );
};

PlaylistCard.propTypes = {
  playlist: PropTypes.shape({
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
  }),
  loading: PropTypes.bool,
};

PlaylistCard.defaultProps = {
  playlist: {
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
  loading: false,
};
