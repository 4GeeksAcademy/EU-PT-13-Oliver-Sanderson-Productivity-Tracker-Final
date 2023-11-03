import PropTypes from "prop-types";
import React from "react";
import { IcOutlineEmail4 } from "../../icons/IcOutlineEmail4";
import { IconBox } from "../IconBox";
import "../../styles/features.css";

const FeaturesCenter = ({
  className,
  iconBoxSizeSmallClassName,
  iconBoxIcon = <IcOutlineEmail4 className="ic-outline-email-4" />,
  text = "Work at the speed",
  paragraphFeatureClassName,
  text1 = "The gradual accumulation of <br/>information about atomic.",
}) => {
  return (
    <div className={`features-center ${className}`}>
      <IconBox className={iconBoxSizeSmallClassName} icon={iconBoxIcon} size="extra-large" />
      <div className="feature-title">{text}</div>
      <p className={`paragraph-feature ${paragraphFeatureClassName}`}>{text1}</p>
    </div>
  );
};

FeaturesCenter.propTypes = {
  text: PropTypes.string,
  text1: PropTypes.string,
};
export default FeaturesCenter;