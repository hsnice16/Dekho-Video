import { useEffect, useReducer } from "react";
import axios from "axios";
import { useToast, useUser } from "context";
import {
  sharedInitialReducerState,
  sharedReducer,
  ACTION_TYPE_ERROR,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
} from "reducer";

/**
 * usePrivateAsync - hook to call private APIs
 * 
 * @param {string} apiToCall - api to call
 * @returns an object {
     config,
     state,
     dispatch,
     postPrivateData,
     deleteAllPrivateData,
     deleteSpecificPrivateData,
   }
 */
export const usePrivateAsync = (apiToCall) => {
  const { api, propertyToGet } = apiToCall;
  const { userState } = useUser();
  const config = {
    headers: {
      authorization: userState.userAuthToken,
    },
  };
  const { handleAddMoreToasts } = useToast();

  const [state, dispatch] = useReducer(
    sharedReducer,
    sharedInitialReducerState
  );

  useEffect(() => {
    (async () => {
      dispatch({ type: ACTION_TYPE_LOADING });

      try {
        const response = await axios.get(api, config);

        dispatch({
          type: ACTION_TYPE_SUCCESS,
          payload: response.data[propertyToGet],
        });
      } catch (error) {
        dispatch({
          type: ACTION_TYPE_ERROR,
          payload: error.message,
        });
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.isUserAuthTokenExist]);

  const postPrivateData = async (data) => {
    dispatch({ type: ACTION_TYPE_LOADING });

    try {
      const response = await axios.post(api, data, config);

      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: response.data[propertyToGet],
      });

      if (propertyToGet !== "history") {
        let [msg, type] =
          propertyToGet === "watchlater"
            ? ["Added in Watch Later 🎉", "private_watch_later"]
            : ["Added in Liked 🎉", "private_liked"];

        [msg, type] =
          propertyToGet === "playlists"
            ? ["Created a new Playlist 🎉", "private_save"]
            : [msg, type];

        handleAddMoreToasts({ msg, type });
      }
    } catch (error) {
      const { status } = error.response;

      if (status === 409) {
        dispatch({
          type: ACTION_TYPE_SUCCESS,
          payload: state.data,
        });
      } else {
        dispatch({
          type: ACTION_TYPE_ERROR,
          payload: error.message,
        });
      }
    }
  };

  const deleteAllPrivateData = async () => {
    dispatch({ type: ACTION_TYPE_LOADING });

    try {
      const response = await axios.delete(`${api}/all`, config);

      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: response.data[propertyToGet],
      });

      let [msg, type] =
        propertyToGet === "watchlater"
          ? ["Cleared All Watch Later 🎉", "private_watch_later"]
          : ["Cleared All Liked 🎉", "private_liked"];

      [msg, type] =
        propertyToGet === "history"
          ? ["Cleared All History 🎉", "private_history"]
          : [msg, type];

      [msg, type] =
        propertyToGet === "playlists"
          ? ["Deleted All Playlists 🎉", "private_save"]
          : [msg, type];

      handleAddMoreToasts({ msg, type });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE_ERROR,
        payload: error.message,
      });
    }
  };

  const deleteSpecificPrivateData = async (id) => {
    dispatch({ type: ACTION_TYPE_LOADING });

    try {
      const response = await axios.delete(`${api}/${id}`, config);

      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: response.data[propertyToGet],
      });

      let [msg, type] =
        propertyToGet === "watchlater"
          ? ["Removed from Watch Later 🎉", "private_watch_later"]
          : ["Removed from Liked 🎉", "private_liked"];

      [msg, type] =
        propertyToGet === "history"
          ? ["Removed from History 🎉", "private_history"]
          : [msg, type];

      [msg, type] =
        propertyToGet === "playlists"
          ? ["Removed from Playlists 🎉", "private_save"]
          : [msg, type];

      handleAddMoreToasts({ msg, type });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE_ERROR,
        payload: error.message,
      });
    }
  };

  const value = {
    config,
    state,
    dispatch,
    postPrivateData,
    deleteAllPrivateData,
    deleteSpecificPrivateData,
  };

  return value;
};
