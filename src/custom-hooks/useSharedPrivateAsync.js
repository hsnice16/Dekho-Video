import { useEffect, useReducer } from "react";
import axios from "axios";
import { useUser } from "context";
import {
  sharedInitialReducerState,
  sharedReducer,
  ACTION_TYPE_ERROR,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
} from "reducer";

/**
 * useSharedPrivateAsync - hook to call GET and POST private APIs
 * 
 * @param {string} apiToCall - api to call
 * @returns an object {
     config,
     state,
     dispatch,
     postPrivateData
   }
 */
export const useSharedPrivateAsync = (apiToCall) => {
  const { api, propertyToGet } = apiToCall;
  const { userState } = useUser();
  const config = {
    headers: {
      authorization: userState.userAuthToken,
    },
  };

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

  const value = {
    config,
    state,
    dispatch,
    postPrivateData,
  };

  return value;
};
