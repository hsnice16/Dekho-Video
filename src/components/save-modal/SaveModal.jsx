import styles from "./SaveModal.module.css";
import { CrossIcon, WatchLaterIcon } from "assets";
import { useModal } from "context";

export const SaveModal = () => {
  const {
    modal: { showModal, watchLater },
    toggleModal,
    handleWatchLaterDispatch,
  } = useModal();

  return (
    <div
      onClick={toggleModal}
      className={`${showModal ? "flex" : "d-none"} modal-container ${
        styles.saveModal
      }`}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="m-auto modal"
      >
        <div
          className={`align-i-ctr flex fs-1p7 justify-c-sb modal-head px-3 py-0p5 ${styles.modalHead}`}
        >
          Save to...
          <button onClick={toggleModal} className="btn p-0">
            <CrossIcon />
          </button>
        </div>

        <ul className="fs-1p5 modal-body px-3 py-0p5">
          <li className="align-i-ctr flex justify-c-sb">
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
        </ul>
      </div>
    </div>
  );
};
