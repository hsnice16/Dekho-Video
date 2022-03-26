import { createContext, useContext } from "react";
import { useAsync } from "custom-hooks";
import { API_TO_GET_ALL_VIDEOS } from "utils";
import { sharedInitialReducerState } from "reducer";

const VideosContext = createContext({
  videos: { ...sharedInitialReducerState },
  dispatch: () => {},
});

const VideosProvider = ({ children }) => {
  const { state: videos, dispatch } = useAsync(API_TO_GET_ALL_VIDEOS);
  const value = { videos, dispatch };

  return (
    <VideosContext.Provider value={value}>{children}</VideosContext.Provider>
  );
};

const useVideos = () => useContext(VideosContext);

export { useVideos, VideosProvider };
