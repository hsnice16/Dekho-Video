import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { v4 as uuid } from "uuid";
import styles from "./VideoCard.module.css";
import {
  AddToPlaylistIcon,
  EternalsPoster,
  MarvelLogo,
  DeleteIcon,
  WatchLaterIcon,
} from "assets";

export const VideoCard = () => {
  const [showOptionsList, setShowOptionsList] = useState(false);

  const handleShowOptionsListToggle = () => {
    setShowOptionsList((prevStateValue) => !prevStateValue);
  };

  const optionsList = [
    {
      _id: uuid(),
      option: "Add to Watch Later",
      GetIcon: (props) => <WatchLaterIcon {...props} />,
    },
    {
      _id: uuid(),
      option: "Add to Playlist",
      GetIcon: (props) => <AddToPlaylistIcon {...props} />,
    },
    {
      _id: uuid(),
      option: "Delete from Watch Later",
      GetIcon: (props) => <DeleteIcon {...props} />,
    },
  ];

  return (
    <div className={`card card-vertical shadow-unset ${styles.VideoCard}`}>
      <div className="card-text-overlay">
        <img
          loading="lazy"
          className="card-vertical-img"
          src={EternalsPoster}
          alt="eternals trailer poster"
        />

        <span
          className={`card-vertical-img overlay-content ${styles.OverlayContent}`}
        >
          <FaPlay className="overlay-play-icon" /> Play
        </span>
      </div>

      <div className="card-text-overlay-row px-0">
        <img
          loading="lazy"
          className="card-horizontal-img shadow-unset"
          src={MarvelLogo}
          alt="marvel logo"
        />

        <div>
          <h6 className="card-head fs-1p5 mt-0p5">
            Marvel Studios' Eternals | Final Trailer
          </h6>
          <p className="card-text fs-1p5">Marvel Entertainment</p>
        </div>

        <span
          className={`cursor-ptr flex mt-0p5 relative ${styles.DotsIconSpan}`}
          onClick={handleShowOptionsListToggle}
        >
          <HiDotsVertical className="fs-2 m-auto" />

          {showOptionsList && (
            <ul className="absolute border-r-0p2 fs-1p5 p-0p5">
              {optionsList.map(({ _id, option, GetIcon }) => (
                <li
                  key={_id}
                  className="align-i-fs border-r-0p2 flex my-0p5 p-0p5"
                >
                  <GetIcon className={styles.ListIcon} /> {option}
                </li>
              ))}
            </ul>
          )}
        </span>
      </div>
    </div>
  );
};
