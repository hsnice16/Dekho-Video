import styles from "./SideNav.module.css";
import classNames from "classnames";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiFillTwitterCircle } from "react-icons/ai";
import { IoMdOpen } from "react-icons/io";
import PropTypes from "prop-types";
import { SideNavLinks } from "data";
import { ROUTE_WATCH_VIDEO } from "utils";

export const SideNav = ({ showShrinkedSideNav, setShowShrinkedSideNav }) => {
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
    <aside>
      <nav
        className={classNames(
          styles.sideNavbar,
          showShrinkedSideNav ? styles.sideNavbar_shrinked : ""
        )}
      >
        <ul className="fs-2">
          {SideNavLinks.map(({ _id, linkTo, linkFor, GetIcon }) => (
            <li key={_id}>
              <NavLink
                to={linkTo}
                title={linkFor}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <GetIcon className={styles.icon} /> <span>{linkFor}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div>
          <a
            href="https://twitter.com/hsnice16"
            target="_blank"
            rel="noreferrer"
            className={classNames(styles.connectLink_text, "text-underline")}
          >
            {showShrinkedSideNav ? (
              <AiFillTwitterCircle className={styles.icon} />
            ) : (
              <>
                Connet with me <IoMdOpen />
              </>
            )}
          </a>
        </div>
      </nav>
    </aside>
  );
};

SideNav.propTypes = {
  showShrinkedSideNav: PropTypes.bool,
  setShowShrinkedSideNav: PropTypes.func,
};

SideNav.defaultProps = {
  showShrinkedSideNav: false,
  setShowShrinkedSideNav: () => {},
};
