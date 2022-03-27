import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./SideNavbar.module.css";
import { SideNavbarLinks } from "data";
import { ROUTE_WATCH_VIDEO } from "utils";

export const SideNavbar = ({ showShrinkedSideNav, setShowShrinkedSideNav }) => {
  const location = useLocation();

  useEffect(() => {
    setShowShrinkedSideNav(
      location.pathname.includes(ROUTE_WATCH_VIDEO) || window.innerWidth <= 940
    );

    const handleWindowResize = () => {
      // 940 = --MD-BREAKPOINT
      if (window.innerWidth <= 940) {
        setShowShrinkedSideNav(true);
      } else {
        setShowShrinkedSideNav(location.pathname.includes(ROUTE_WATCH_VIDEO));
      }
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [location.pathname, setShowShrinkedSideNav]);

  return (
    <nav
      className={`${styles.sideNavbar} ${
        showShrinkedSideNav ? styles.sideNavbar_shrinked : ""
      }`}
    >
      <ul className="fs-2">
        {SideNavbarLinks.map(({ _id, linkTo, linkFor, GetIcon }) => (
          <li key={_id}>
            <NavLink
              to={linkTo}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <GetIcon className={styles.icon} /> <span>{linkFor}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
