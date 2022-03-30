import { createContext, useContext } from "react";
import { usePrivateAsync } from "custom-hooks";
import { API_TO_GET_LIKED } from "utils";
import { sharedInitialReducerState } from "reducer";
import { useUser } from "context";

const LikedContext = createContext({
  liked: { ...sharedInitialReducerState },
  dispatch: () => {},
  postLiked: () => {},
  deleteAllLiked: () => {},
  deleteSpecificLiked: () => {},
  getLikedMappedData: () => {},
  isVideoLiked: () => {},
});

const LikedProvider = ({ children }) => {
  const { userState } = useUser();
  const {
    state: liked,
    dispatch,
    postPrivateData: postLiked,
    deleteAllPrivateData: deleteAllLiked,
    deleteSpecificPrivateData: deleteSpecificLiked,
  } = usePrivateAsync(API_TO_GET_LIKED);

  const isVideoLiked = (videoId) => {
    return liked.data.some(({ _id }) => _id === videoId);
  };

  const getLikedMappedData = (dataToFilter) => {
    if (userState.isUserAuthTokenExist && liked.data) {
      return liked.data.length > 0
        ? dataToFilter.map((video) =>
            isVideoLiked(video._id)
              ? { ...video, isLiked: true }
              : { ...video, isLiked: false }
          )
        : dataToFilter;
    }

    return dataToFilter;
  };

  const value = {
    liked,
    dispatch,
    postLiked,
    deleteAllLiked,
    deleteSpecificLiked,
    getLikedMappedData,
    isVideoLiked,
  };

  return (
    <LikedContext.Provider value={value}>{children}</LikedContext.Provider>
  );
};

const useLiked = () => useContext(LikedContext);

export { LikedProvider, useLiked };
