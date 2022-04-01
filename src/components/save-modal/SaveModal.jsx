import styles from "./SaveModal.module.css";
import classNames from "classnames";
import { CrossIcon, PlaySpeedIcon, PlusIcon, WatchLaterIcon } from "assets";
import { useModal, usePlaylists } from "context";
import {
  ACTION_TYPE_ENTER_PLAYLIST_NAME,
  ACTION_TYPE_TOGGLE_PLAYLIST_FORM,
} from "reducer";

export const SaveModal = () => {
  const {
    modal,
    dispatch,
    toggleModal,
    handleWatchLaterDispatch,
    handlePlaylistFormSubmit,
    handlePlaylistsCheckboxDispatch,
  } = useModal();
  const {
    playlistFormError,
    playlistName,
    selectedPlaylists,
    showModal,
    showNewPlaylistForm,
    watchLater,
  } = modal;

  const { playlists } = usePlaylists();
  const { status: playlistsStatus, data: playlistsData } = playlists;

  return (
    <div
      onClick={toggleModal}
      className={classNames(
        showModal ? "flex" : "d-none",
        "modal-container",
        styles.saveModal
      )}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="m-auto modal"
      >
        <div
          className={classNames(
            "align-i-ctr",
            "flex",
            "fs-1p7",
            "justify-c-sb",
            "modal-head",
            styles.modalHead
          )}
        >
          Save to...
          <button onClick={toggleModal} className="btn p-0">
            <CrossIcon />
          </button>
        </div>

        <ul className="fs-1p5 modal-body px-3 py-0p5">
          <li className="align-i-ctr flex justify-c-sb mb-1">
            <label
              htmlFor="watch-later"
              className="align-i-ctr cursor-ptr flex"
            >
              <input
                type="checkbox"
                name="watchLater"
                id="watch-later"
                checked={watchLater}
                onChange={handleWatchLaterDispatch}
                className="cursor-ptr mr-1"
              />
              Watch Later
            </label>

            <WatchLaterIcon className="m-0p5" />
          </li>

          {playlistsStatus === "success" &&
            playlistsData.map(({ _id, title }) => (
              <li key={_id} className="align-i-ctr flex justify-c-sb mb-1">
                <label htmlFor={_id} className="align-i-ctr cursor-ptr flex">
                  <input
                    type="checkbox"
                    name="playlists"
                    value={title}
                    id={_id}
                    className="cursor-ptr mr-1"
                    checked={selectedPlaylists.includes(title)}
                    onChange={(event) => {
                      handlePlaylistsCheckboxDispatch(event, _id);
                    }}
                  />
                  {title}
                </label>

                <PlaySpeedIcon className="m-0p5" />
              </li>
            ))}
        </ul>

        <div
          className={classNames("modal-foot", "text-left", styles.modalFoot)}
        >
          {showNewPlaylistForm === false ? (
            <button
              className={classNames("btn", styles.createNewPlaylist_btn)}
              onClick={() => {
                dispatch({ type: ACTION_TYPE_TOGGLE_PLAYLIST_FORM });
              }}
            >
              <PlusIcon /> Create new playlist
            </button>
          ) : (
            <form className="flex flex-direction-col">
              <label className="mt-1" htmlFor="playlist-name">
                Name
              </label>
              <input
                id="playlist-name"
                name="playlistName"
                type="text"
                className="bg-unset border-r-0p2 input mx-0 w-100pct"
                placeholder="playlist name..."
                value={playlistName}
                onChange={(event) => {
                  dispatch({
                    type: ACTION_TYPE_ENTER_PLAYLIST_NAME,
                    payload: event.target.value,
                  });
                }}
              />

              {playlistFormError && (
                <span className="fs-1p5 text-red-500">{playlistFormError}</span>
              )}

              <button
                onClick={handlePlaylistFormSubmit}
                className={classNames(
                  "btn",
                  "fs-1p6",
                  "fw-bold",
                  "mx-0",
                  styles.formBtn
                )}
              >
                Create
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
