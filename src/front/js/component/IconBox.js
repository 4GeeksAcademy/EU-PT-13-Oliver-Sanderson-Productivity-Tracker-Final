import PropTypes from "prop-types";
import React from "react";
import { IcOutlineEmail4 } from "../../icons/IcOutlineEmail4";
import "../../styles/features.css";

const IconBox = ({ size, className, icon = <IcOutlineEmail4 className="ic-outline-email" /> }) => {
  return <div className={`icon-box ${size} ${className}`}>{icon}</div>;
};

IconBox.propTypes = {
  size: PropTypes.oneOf(["large", "extra-large", "medium", "small"]),
};
export default IconBox;