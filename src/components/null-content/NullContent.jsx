import styles from "./NullContent.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useDocumentTitle } from "custom-hooks";
import { magicBox, teleScope } from "assets";

export const NullContent = ({ isUserLoggedIn, children, titleToShow }) => {
  useDocumentTitle(titleToShow);

  const [url, altText] = isUserLoggedIn
    ? [magicBox, "empty box icon"]
    : [teleScope, "telescope icon"];

  return (
    <div
      className={classNames(
        "pt-5",
        "text-center",
        styles.nullContent_container
      )}
    >
      <img loading="lazy" className="max-w-20" src={url} alt={altText} />

      {children}
    </div>
  );
};

NullContent.propTypes = {
  isUserLoggedIn: PropTypes.bool,
  children: PropTypes.node,
  titleToShow: PropTypes.string,
};

NullContent.defaultProps = {
  isUserLoggedIn: false,
  children: <></>,
  titleToShow: "",
};
