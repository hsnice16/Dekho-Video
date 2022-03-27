import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const FormLink = ({ linkTo, linkText }) => (
  <Link className="fw-bold inline-block mt-1 text-center w-100pct" to={linkTo}>
    {linkText}
  </Link>
);

FormLink.propTypes = {
  linkTo: PropTypes.string,
  linkText: PropTypes.string,
};

FormLink.defaultProps = {
  linkTo: "",
  linkText: "",
};

export { FormLink };
