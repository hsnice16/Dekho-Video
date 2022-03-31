import { createContext, useContext } from "react";
import { usePrivateAsync } from "custom-hooks";
import { API_TO_GET_WATCH_LATER } from "utils";
import { sharedInitialReducerState } from "reducer";
import { useUser } from "context";

const WatchLaterContext = createContext({
  watchLater: { ...sharedInitialReducerState },
  dispatch: () => {},
  postWatchLater: () => {},
  deleteAllWatchLater: () => {},
  deleteSpecificWatchLater: () => {},
  getWatchLaterMappedData: () => {},
  isVideoInWatchLater: () => {},
});

const WatchLaterProvider = ({ children }) => {
  const { userState } = useUser();
  const {
    state: watchLater,
    dispatch,
    postPrivateData: postWatchLater,
    deleteAllPrivateData: deleteAllWatchLater,
    deleteSpecificPrivateData: deleteSpecificWatchLater,
  } = usePrivateAsync(API_TO_GET_WATCH_LATER);

  const isVideoInWatchLater = (videoId) => {
    return watchLater.data.some(({ _id }) => _id === videoId);
  };

  const getWatchLaterMappedData = (dataToFilter) => {
    if (userState.isUserAuthTokenExist && watchLater.data) {
      return watchLater.data.length > 0
        ? dataToFilter.map((video) =>
            isVideoInWatchLater(video._id)
              ? { ...video, isInWatchLater: true }
              : { ...video, isInWatchLater: false }
          )
        : dataToFilter;
    }

    return dataToFilter;
  };

  const value = {
    watchLater,
    dispatch,
    postWatchLater,
    deleteAllWatchLater,
    deleteSpecificWatchLater,
    getWatchLaterMappedData,
    isVideoInWatchLater,
  };

  return (
    <WatchLaterContext.Provider value={value}>
      {children}
    </WatchLaterContext.Provider>
  );
};

const useWatchLater = () => useContext(WatchLaterContext);

export { WatchLaterProvider, useWatchLater };
