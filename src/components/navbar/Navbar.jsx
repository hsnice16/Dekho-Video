import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FilledAvatar, OutlinedAvatar, BrandLogo } from "assets";
import { ROUTE_SIGN_IN, ROUTE_ROOT } from "utils";
import { useUser } from "context";
import { useCookieHandler } from "custom-hooks";

export const Navbar = () => {
  const { userState, userInitialState, setUserState } = useUser();
  const { eraseUserAuthTokenCookie } = useCookieHandler();

  const handleLogOutClick = () => {
    setUserState(userInitialState);
    eraseUserAuthTokenCookie();
  };

  return (
    <nav className={`align-i-ctr flex justify-c-sb p-1 ${styles.Navbar}`}>
      <div className="flex">
        <BrandLogo className={styles.Logo} />
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
            <FilledAvatar className={styles.FilledAvatar} />
            <span>Log Out</span>
          </>
        ) : (
          <>
            <OutlinedAvatar className={styles.Logo} />
            <span>Log In</span>
          </>
        )}
      </Link>
    </nav>
  );
};
