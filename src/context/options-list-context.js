import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  AddToPlaylistIcon,
  LikedIcon,
  OutlinedLikedIcon,
  OutlinedWatchLaterIcon,
  WatchLaterIcon,
} from "assets";
import { ROUTE_ROOT } from "utils";

const OptionsListContext = createContext({
  showOptionsListForVideo: "",
  toggleShowOptionsList: () => {},
  getOptionsList: () => {},
});

const OptionsListProvider = ({ children }) => {
  const [showOptionsListForVideo, setShowOptionsListForVideo] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleDocumentClick = () => {
      if (showOptionsListForVideo !== "") setShowOptionsListForVideo("");
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showOptionsListForVideo]);

  /**
   * getOptionsList - function to
   *          get options list based on the
   *          current page and parameters value
   *
   * @param {bool} isInWatchLater - is current video
   *                                in Watch Later?
   * @param {bool} isLiked - is current video Liked?
   * @returns options list
   */
  const getOptionsList = (isInWatchLater, isLiked) => {
    let optionsList = [
      {
        _id: uuid(),
        option: `${isInWatchLater ? "Remove from" : "Add to"} Watch Later`,
        GetIcon: (props) =>
          isInWatchLater ? (
            <WatchLaterIcon {...props} />
          ) : (
            <OutlinedWatchLaterIcon {...props} />
          ),
      },
      {
        _id: uuid(),
        option: "Add to Playlist",
        GetIcon: (props) => <AddToPlaylistIcon {...props} />,
      },
    ];

    optionsList =
      location.pathname === ROUTE_ROOT
        ? [...optionsList]
        : [
            ...optionsList,
            {
              _id: uuid(),
              option: `${isLiked ? "Remove from" : "Add to"} Liked`,
              GetIcon: (props) =>
                isLiked ? (
                  <LikedIcon {...props} />
                ) : (
                  <OutlinedLikedIcon {...props} />
                ),
            },
          ];

    return optionsList;
  };

  const toggleShowOptionsList = (event, _id) => {
    event.stopPropagation();

    setShowOptionsListForVideo((prevValue) => (prevValue === _id ? "" : _id));
  };

  const value = {
    showOptionsListForVideo,
    toggleShowOptionsList,
    getOptionsList,
  };

  return (
    <OptionsListContext.Provider value={value}>
      {children}
    </OptionsListContext.Provider>
  );
};

const useOptionsList = () => useContext(OptionsListContext);

export { OptionsListProvider, useOptionsList };
