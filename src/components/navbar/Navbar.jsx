import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

import { OutlinedAvatar, BrandLogo } from "assets";
import { ROUTE_ROOT } from "utils";

export const Navbar = () => {
  return (
    <nav className={`align-i-ctr flex justify-c-sb p-1 ${styles.Navbar}`}>
      <div className="flex">
        <BrandLogo className={styles.Logo} />
        <Link to={ROUTE_ROOT} className="fs-3">
          DekhoVideo
        </Link>
      </div>

      <Link to="#" className="align-i-ctr flex flex-direction-col mr-2 p-0p5">
        <OutlinedAvatar className={styles.Logo} />
        <span>Log In</span>
      </Link>
    </nav>
  );
};
