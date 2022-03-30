import styles from "./Toast.module.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ROUTE_SIGN_IN } from "utils";
import { CrossIcon } from "assets";

export const Toast = ({ msg, type, handleToastClose }) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      handleToastClose();
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`toast ${styles.toast}`}>
      <div className="toast-head">
        Message from Dekho Video
        <button className="flex toast-cross" onClick={handleToastClose}>
          <CrossIcon />
        </button>
      </div>
      <p className="toast-msg">
        {!["public_liked", "public_save", "public_watch_later"].includes(
          type
        ) ? (
          msg
        ) : (
          <>
            {type === "public_save" ? "Want to save" : `Want to add in ${msg}`}
            ❓{" "}
            <Link className="toast-link" to={ROUTE_SIGN_IN}>
              Log In
            </Link>{" "}
            first
          </>
        )}
      </p>
    </div>
  );
};

Toast.propTypes = {
  msg: PropTypes.string,
  type: PropTypes.string,
  handleToastClose: PropTypes.func,
};

Toast.defaultProps = {
  msg: "",
  type: "",
  handleToastClose: () => {},
};
