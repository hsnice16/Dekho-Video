import {
  ACTION_TYPE_CHECK_WATCH_LATER,
  ACTION_TYPE_TOGGLE_MODAL,
  ACTION_TYPE_TOGGLE_PLAYLIST_FORM,
  ACTION_TYPE_ENTER_PLAYLIST_NAME,
  ACTION_TYPE_PLAYLIST_FORM_ERROR,
  ACTION_TYPE_FILL_SELECTED_PLAYLISTS,
} from "reducer";

export const modalReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE_TOGGLE_MODAL:
      return {
        ...state,
        showModal: !state.showModal,
        video: action.payload,
      };

    case ACTION_TYPE_TOGGLE_PLAYLIST_FORM:
      return {
        ...state,
        showNewPlaylistForm: !state.showNewPlaylistForm,
        playlistName: "",
      };

    case ACTION_TYPE_CHECK_WATCH_LATER:
      return { ...state, watchLater: action.payload };

    case ACTION_TYPE_ENTER_PLAYLIST_NAME:
      return { ...state, playlistName: action.payload };

    case ACTION_TYPE_PLAYLIST_FORM_ERROR:
      return { ...state, playlistFormError: action.payload };

    case ACTION_TYPE_FILL_SELECTED_PLAYLISTS:
      return { ...state, selectedPlaylists: action.payload };

    default:
      return state;
  }
};
