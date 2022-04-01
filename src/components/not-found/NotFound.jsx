import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDocumentTitle } from "custom-hooks";
import { crossSearch } from "assets";
import { ROUTE_ROOT } from "utils";
import { Button } from "components";

export const NotFound = ({ documentTitle, className, textToShow }) => {
  useDocumentTitle(documentTitle);
  const navigate = useNavigate();

  return (
    <div className={classNames("pt-5", "text-center", className)}>
      <img
        loading="lazy"
        className="max-w-20"
        src={crossSearch}
        alt="search icon with cross in center"
      />
      <h1>{textToShow}</h1>

      <Button
        className="btn mt-2"
        onClick={() => {
          navigate(ROUTE_ROOT, { replace: true });
        }}
      >
        Go to Home
      </Button>
    </div>
  );
};

NotFound.propTypes = {
  documentTitle: PropTypes.string,
  className: PropTypes.string,
  textToShow: PropTypes.string,
};

NotFound.defaultProps = {
  documentTitle: "",
  className: "",
  textToShow: "",
};
