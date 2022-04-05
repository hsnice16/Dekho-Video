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
import {
  useHistory,
  useLiked,
  useModal,
  useToast,
  useUser,
  useWatchLater,
} from "context";

const OptionsListContext = createContext({
  showOptionsListForVideo: "",
  setShowOptionsListForVideo: () => {},
  toggleShowOptionsList: () => {},
  getOptionsList: () => {},
});

const OptionsListProvider = ({ children }) => {
  const [showOptionsListForVideo, setShowOptionsListForVideo] = useState("");
  const location = useLocation();
  const { userState } = useUser();
  const { toggleModal } = useModal();
  const { handleAddMoreToasts } = useToast();
  const { deleteSpecificLiked, postLiked } = useLiked();
  const { deleteSpecificHistory } = useHistory();
  const { deleteSpecificWatchLater, postWatchLater } = useWatchLater();

  useEffect(() => {
    const handleDocumentClick = () => {
      if (showOptionsListForVideo !== "") setShowOptionsListForVideo("");
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showOptionsListForVideo]);

  const getOptionsList = (isInWatchLater, isLiked) => {
    // options list on Home page
    let optionsList = [
      {
        _id: uuid(),
        option: `${isInWatchLater ? "Remove from" : "Add to"} Watch Later`,
        handleClick: (id, details) => {
          if (userState.isUserAuthTokenExist) {
            if (isInWatchLater) {
              deleteSpecificWatchLater(id);
            } else {
              postWatchLater({ video: { ...details } });
            }
          } else {
            handleAddMoreToasts({
              msg: "Watch Later",
              type: "public_watch_later",
            });
          }
        },
        GetIcon: (props) =>
          isInWatchLater ? (
            <WatchLaterIcon {...props} />
          ) : (
            <OutlinedWatchLaterIcon {...props} />
          ),
      },
      {
        _id: uuid(),
        option: "Save to Playlist",
        handleClick: (_, details) => {
          if (userState.isUserAuthTokenExist) {
            toggleModal({ ...details, isInWatchLater });
          } else {
            handleAddMoreToasts({
              type: "public_save",
            });
          }
        },
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
                deleteSpecificHistory(id);
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
            handleClick: (id, details) => {
              if (userState.isUserAuthTokenExist) {
                if (isLiked) {
                  deleteSpecificLiked(id);
                } else {
                  postLiked({ video: { ...details } });
                }
              } else {
                handleAddMoreToasts({
                  msg: "Liked",
                  type: "public_liked",
                });
              }
            },
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
    setShowOptionsListForVideo,
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
