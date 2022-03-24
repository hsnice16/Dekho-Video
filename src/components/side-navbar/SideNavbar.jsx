import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./SideNavbar.module.css";
import { SideNavbarLinks } from "data";

export const SideNavbar = () => {
  return (
    <nav className={styles.SideNavbar}>
      <ul className="fs-2">
        {SideNavbarLinks.map(({ _id, linkTo, linkFor, GetIcon }) => (
          <li key={_id}>
            <NavLink
              to={linkTo}
              className={({ isActive }) => (isActive ? styles.Active : "")}
            >
              <GetIcon className={styles.Icon} /> <span>{linkFor}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
