import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FilledAvatar, OutlinedAvatar, BrandLogo } from "assets";
import { ROUTE_SIGN_IN, ROUTE_ROOT } from "utils";
import { useToast, useUser } from "context";
import { useCookieHandler } from "custom-hooks";

export const Navbar = () => {
  const { handleAddMoreToasts } = useToast();
  const { userState, userInitialState, setUserState } = useUser();
  const { eraseUserAuthTokenCookie } = useCookieHandler();

  const handleLogOutClick = () => {
    handleAddMoreToasts({
      msg: "Hope you had a great time! Successfully Logged Out 🎉🎉",
      type: "log_out",
    });

    setUserState(userInitialState);
    eraseUserAuthTokenCookie();
  };

  return (
    <nav className={`align-i-ctr flex justify-c-sb p-1 ${styles.navbar}`}>
      <div className="flex">
        <BrandLogo className={styles.logo} />
        <Link to={ROUTE_ROOT} className="fs-3">
          DekhoVideo
        </Link>
      </div>

      <Link
        to={userState.isUserAuthTokenExist ? ROUTE_ROOT : ROUTE_SIGN_IN}
        onClick={userState.isUserAuthTokenExist ? handleLogOutClick : () => {}}
        className="align-i-ctr flex flex-direction-col mr-2 p-0p5"
      >
        {userState.isUserAuthTokenExist ? (
          <>
            <FilledAvatar className={styles.avatar_filled} />
            <span>Log Out</span>
          </>
        ) : (
          <>
            <OutlinedAvatar className={styles.logo} />
            <span>Log In</span>
          </>
        )}
      </Link>
    </nav>
  );
};
