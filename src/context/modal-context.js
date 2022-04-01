import { createContext, useContext, useReducer } from "react";
import { SaveModal } from "components";
import { usePlaylists, useWatchLater } from "context";
import {
  modalInitialReducerState,
  modalReducer,
  ACTION_TYPE_CHECK_WATCH_LATER,
  ACTION_TYPE_TOGGLE_MODAL,
  ACTION_TYPE_TOGGLE_PLAYLIST_FORM,
  ACTION_TYPE_PLAYLIST_FORM_ERROR,
  ACTION_TYPE_FILL_SELECTED_PLAYLISTS,
} from "reducer";

const ModalContext = createContext({
  modal: { ...modalInitialReducerState },
  dispatch: () => {},
  toggleModal: () => {},
  handleWatchLaterDispatch: () => {},
  handlePlaylistFormSubmit: () => {},
  handlePlaylistsCheckboxDispatch: () => {},
});

const ModalProvider = ({ children }) => {
  const {
    playlists,
    postPlaylists,
    postVideoInSpecificPlaylist,
    deleteVideoFromSpecificPlaylist,
  } = usePlaylists();
  const { deleteSpecificWatchLater, postWatchLater } = useWatchLater();
  const [modal, dispatch] = useReducer(modalReducer, modalInitialReducerState);

  const toggleModal = (video) => {
    dispatch({ type: ACTION_TYPE_TOGGLE_MODAL, payload: video });

    if (video.isInWatchLater) {
      dispatch({ type: ACTION_TYPE_CHECK_WATCH_LATER, payload: true });
    } else {
      dispatch({ type: ACTION_TYPE_CHECK_WATCH_LATER, payload: false });
    }

    const videoInPlaylists = playlists.data.reduce(
      (acc, { title, videos }) =>
        videos.some(({ _id }) => _id === video._id) ? [...acc, title] : acc,
      []
    );

    dispatch({
      type: ACTION_TYPE_FILL_SELECTED_PLAYLISTS,
      payload: videoInPlaylists,
    });
  };

  const handlePlaylistFormSubmit = (event) => {
    event.preventDefault();

    if (modal.playlistName === "") {
      dispatch({
        type: ACTION_TYPE_PLAYLIST_FORM_ERROR,
        payload: "Enter name first",
      });
    } else {
      postPlaylists({
        playlist: { title: modal.playlistName, description: "" },
      });

      dispatch({ type: ACTION_TYPE_TOGGLE_PLAYLIST_FORM });
    }
  };

  const handleWatchLaterDispatch = (event) => {
    dispatch({
      type: ACTION_TYPE_CHECK_WATCH_LATER,
      payload: event.target.checked,
    });

    if (event.target.checked) {
      postWatchLater({ video: { ...modal.video } });
    } else {
      deleteSpecificWatchLater(modal.video._id);
    }
  };

  const handlePlaylistsCheckboxDispatch = (event, playlistId) => {
    const data = [...modal.selectedPlaylists];

    if (event.target.checked) data.push(event.target.value);
    else data.splice(data.indexOf(event.target.value), 1);

    dispatch({ type: ACTION_TYPE_FILL_SELECTED_PLAYLISTS, payload: data });

    if (event.target.checked) {
      postVideoInSpecificPlaylist(
        playlistId,
        { video: { ...modal.video } },
        event.target.value
      );
    } else {
      deleteVideoFromSpecificPlaylist(
        playlistId,
        modal.video._id,
        event.target.value
      );
    }
  };

  const value = {
    modal,
    dispatch,
    toggleModal,
    handleWatchLaterDispatch,
    handlePlaylistFormSubmit,
    handlePlaylistsCheckboxDispatch,
  };

  return (
    <ModalContext.Provider value={value}>
      <SaveModal />

      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { ModalProvider, useModal };
