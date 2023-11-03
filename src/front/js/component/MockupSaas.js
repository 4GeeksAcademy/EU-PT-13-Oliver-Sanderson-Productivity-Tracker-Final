import PropTypes from "prop-types";
import React from "react";
import "../../styles/style.css";

const MockupSaas = ({
  className,
  rectangleClassName,
  rectangle = "https://c.animaapp.com/me0UN20d/img/rectangle-21.png",
}) => {
  return (
    <div className={`mockup-saas ${className}`}>
      <img className={`rectangle ${rectangleClassName}`} alt="Rectangle" src={rectangle} />
    </div>
  );
};

MockupSaas.propTypes = {
  rectangle: PropTypes.string,
};
export default MockupSaas;