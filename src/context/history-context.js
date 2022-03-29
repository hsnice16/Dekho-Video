import { createContext, useContext } from "react";
import { usePrivateAsync } from "custom-hooks";
import { API_TO_GET_HISTORY } from "utils";
import { sharedInitialReducerState } from "reducer";

const HistoryContext = createContext({
  history: { ...sharedInitialReducerState },
  dispatch: () => {},
  postHistory: () => {},
  deleteAllHistory: () => {},
  deleteSpecificHistory: () => {},
});

const HistoryProvider = ({ children }) => {
  const {
    state: history,
    dispatch,
    postPrivateData: postHistory,
    deleteAllPrivateData: deleteAllHistory,
    deleteSpecificPrivateData: deleteSpecificHistory,
  } = usePrivateAsync(API_TO_GET_HISTORY);

  const value = {
    history,
    dispatch,
    postHistory,
    deleteAllHistory,
    deleteSpecificHistory,
  };

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
};

const useHistory = () => useContext(HistoryContext);

export { HistoryProvider, useHistory };
