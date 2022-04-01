import { createContext, useContext } from "react";
import axios from "axios";
import { useToast } from "context";
import { usePrivateAsync } from "custom-hooks";
import { API_TO_GET_PLAYLISTS } from "utils";
import {
  sharedInitialReducerState,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  ACTION_TYPE_ERROR,
} from "reducer";

const PlaylistsContext = createContext({
  playlists: { ...sharedInitialReducerState },
  dispatch: () => {},
  postPlaylists: () => {},
  deleteAllPlaylists: () => {},
  deleteSpecificPlaylists: () => {},
  postVideoInSpecificPlaylist: () => {},
  deleteVideoFromSpecificPlaylist: () => {},
});

const PlaylistsProvider = ({ children }) => {
  const { handleAddMoreToasts } = useToast();
  const {
    config,
    state: playlists,
    dispatch,
    postPrivateData: postPlaylists,
    deleteAllPrivateData: deleteAllPlaylists,
    deleteSpecificPrivateData: deleteSpecificPlaylists,
  } = usePrivateAsync(API_TO_GET_PLAYLISTS);

  const { api, propertyToGet } = API_TO_GET_PLAYLISTS;

  const postVideoInSpecificPlaylist = async (playlistId, data, title) => {
    dispatch({ type: ACTION_TYPE_LOADING });

    try {
      const response = await axios.post(`${api}/${playlistId}`, data, config);

      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: response.data[propertyToGet],
      });

      handleAddMoreToasts({
        msg: `Added video in ${title} playlist 🎉`,
        type: "private_save",
      });
    } catch (error) {
      const { status } = error.response;

      if (status === 409) {
        dispatch({
          type: ACTION_TYPE_SUCCESS,
          payload: playlists.data,
        });
      } else {
        dispatch({
          type: ACTION_TYPE_ERROR,
          payload: error.message,
        });
      }
    }
  };

  const deleteVideoFromSpecificPlaylist = async (
    playlistId,
    videoId,
    title
  ) => {
    dispatch({ type: ACTION_TYPE_LOADING });

    try {
      const response = await axios.delete(
        `${api}/${playlistId}/${videoId}`,
        config
      );

      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: response.data[propertyToGet],
      });

      handleAddMoreToasts({
        msg: `Removed video from ${title} playlist 🎉`,
        type: "private_save",
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE_ERROR,
        payload: error.message,
      });
    }
  };

  const value = {
    playlists,
    dispatch,
    postPlaylists,
    deleteAllPlaylists,
    deleteSpecificPlaylists,
    postVideoInSpecificPlaylist,
    deleteVideoFromSpecificPlaylist,
  };

  return (
    <PlaylistsContext.Provider value={value}>
      {children}
    </PlaylistsContext.Provider>
  );
};

const usePlaylists = () => useContext(PlaylistsContext);

export { PlaylistsProvider, usePlaylists };
