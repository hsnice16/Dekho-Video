import styles from "./FooterNav.module.css";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SideNavLinks } from "data";

export const FooterNav = () => {
  return (
    <footer className={styles.footerNav}>
      <nav>
        <ul className="fs-2">
          {SideNavLinks.map(({ _id, linkTo, GetIcon }) => (
            <li key={_id}>
              <NavLink
                to={linkTo}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <GetIcon className={styles.icon} />
              </NavLink>
            </li>
          ))}

          <li>
            <a
              href="https://twitter.com/hsnice16"
              target="_blank"
              rel="noreferrer"
              className={classNames(styles.connectLink_text, "text-underline")}
            >
              <AiFillTwitterCircle className={styles.icon} />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
