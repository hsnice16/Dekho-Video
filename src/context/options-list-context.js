import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  AddToPlaylistIcon,
  DustbinIcon,
  LikedIcon,
  OutlinedLikedIcon,
  OutlinedWatchLaterIcon,
  WatchLaterIcon,
} from "assets";
import { ROUTE_ROOT, ROUTE_HISTORY } from "utils";
import { useHistory } from "context";

const OptionsListContext = createContext({
  showOptionsListForVideo: "",
  toggleShowOptionsList: () => {},
  getOptionsList: () => {},
});

const OptionsListProvider = ({ children }) => {
  const [showOptionsListForVideo, setShowOptionsListForVideo] = useState("");
  const location = useLocation();
  const { deleteSpecificHistoryCall } = useHistory();

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
    // options list on Home page
    let optionsList = [
      {
        _id: uuid(),
        option: `${isInWatchLater ? "Remove from" : "Add to"} Watch Later`,
        handleClick: () => {},
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
        handleClick: () => {},
        GetIcon: (props) => <AddToPlaylistIcon {...props} />,
      },
    ];

    // options list on History page
    optionsList =
      location.pathname === ROUTE_HISTORY
        ? [
            {
              _id: uuid(),
              option: "Remove from History",
              handleClick: (id) => {
                deleteSpecificHistoryCall(id);
              },
              GetIcon: (props) => <DustbinIcon {...props} />,
            },
          ]
        : optionsList;

    // options list on page other than Home and History
    optionsList = [ROUTE_ROOT, ROUTE_HISTORY].includes(location.pathname)
      ? optionsList
      : [
          ...optionsList,
          {
            _id: uuid(),
            option: `${isLiked ? "Remove from" : "Add to"} Liked`,
            handleClick: () => {},
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
