import styles from "./PlaylistCard.module.css";
import cardStyles from "../Card.module.css";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { PlaylistPlayIcon } from "assets";
import { ROUTE_PLAYLIST } from "utils";

export const PlaylistCard = () => {
  return (
    <div
      className={classNames(
        "card",
        "card-vertical",
        "shadow-unset",
        cardStyles.card,
        styles.playlistCard
      )}
    >
      <div className="card-text-overlay">
        <img
          loading="lazy"
          className="block card-vertical-img"
          src="https://img.youtube.com/vi/udKE1ksKWDE/mqdefault.jpg"
          alt=""
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
          3 <PlaylistPlayIcon />
        </span>

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
      </div>

      <h2 className="card-head fs-1p5 mx-0 my-0p5">Sangeet</h2>
      <Link to={`${ROUTE_PLAYLIST}/1`} className="card-text fs-1p5 m-0">
        View Full Playlist
      </Link>
    </div>
  );
};
