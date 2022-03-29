import { createContext, useContext, useReducer } from "react";
import { SaveModal } from "components";
import { useWatchLater } from "context";
import {
  modalInitialReducerState,
  modalReducer,
  ACTION_TYPE_CHECK_WATCH_LATER,
  ACTION_TYPE_TOGGLE_MODAL,
} from "reducer";

const ModalContext = createContext({
  modal: { ...modalInitialReducerState },
  toggleModal: () => {},
  handleWatchLaterDispatch: () => {},
});

const ModalProvider = ({ children }) => {
  const { deleteSpecificWatchLater, postWatchLater } = useWatchLater();
  const [modal, dispatch] = useReducer(modalReducer, modalInitialReducerState);

  const toggleModal = (video) => {
    dispatch({ type: ACTION_TYPE_TOGGLE_MODAL, payload: video });

    console.log(video);

    if (video.isInWatchLater)
      dispatch({ type: ACTION_TYPE_CHECK_WATCH_LATER, payload: true });
  };

  const handleWatchLaterDispatch = (event) => {
    dispatch({
      type: ACTION_TYPE_CHECK_WATCH_LATER,
      payload: event.target.checked,
    });

    if (event.target.checked) {
      postWatchLater({ video: { ...modal.video, isInWatchLater: true } });
    } else {
      deleteSpecificWatchLater(modal.video._id);
    }
  };

  const value = { modal, toggleModal, handleWatchLaterDispatch };

  return (
    <ModalContext.Provider value={value}>
      <SaveModal />

      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { ModalProvider, useModal };
