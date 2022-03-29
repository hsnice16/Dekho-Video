import { createContext, useContext } from "react";
import axios from "axios";
import { useSharedPrivateAsync } from "custom-hooks";
import { API_TO_GET_HISTORY } from "utils";
import {
  sharedInitialReducerState,
  ACTION_TYPE_ERROR,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
} from "reducer";

const HistoryContext = createContext({
  history: { ...sharedInitialReducerState },
  dispatch: () => {},
  postHistoryCall: () => {},
  deleteAllHistoryCall: () => {},
  deleteSpecificHistoryCall: () => {},
});

const HistoryProvider = ({ children }) => {
  const { api, propertyToGet } = API_TO_GET_HISTORY;
  const {
    config,
    state: history,
    dispatch,
    postPrivateData: postHistoryCall,
  } = useSharedPrivateAsync(API_TO_GET_HISTORY);

  const deleteAllHistoryCall = async () => {
    dispatch({ type: ACTION_TYPE_LOADING });

    try {
      const response = await axios.delete(`${api}/all`, config);

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
  };

  const deleteSpecificHistoryCall = async (id) => {
    dispatch({ type: ACTION_TYPE_LOADING });

    try {
      const response = await axios.delete(`${api}/${id}`, config);

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
  };

  const value = {
    history,
    dispatch,
    postHistoryCall,
    deleteAllHistoryCall,
    deleteSpecificHistoryCall,
  };

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
};

const useHistory = () => useContext(HistoryContext);

export { HistoryProvider, useHistory };
