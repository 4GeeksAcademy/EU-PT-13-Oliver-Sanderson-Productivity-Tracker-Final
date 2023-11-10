import PropTypes from "prop-types";
import React from "react";
import "../../styles/style.css";

const OpenSansMontserrat = ({
  className,
  itSABigWorldOutClassName,
  text = "It&#39;s a Big World Out There, Go explore",
  hasItSABigWorldOut = true,
  embraceLifeSClassName,
  text1 = "Embrace life&#39;s vastness, venture forth, and discover the wonders waiting beyond. The world beckons; seize its grand offerings now!",
  hasDiv = true,
  hasStyles = true,
}) => {
  return (
    <div className={`open-sans-montserrat ${className}`}>
      <p className={`it-s-a-big-world-out ${itSABigWorldOutClassName}`}>{text}</p>
      {hasItSABigWorldOut && <p className="text-wrapper">{text}</p>}

      <p className={`embrace-life-s ${embraceLifeSClassName}`}>{text1}</p>
      {hasDiv && <div className="div">Start Now</div>}

      {hasStyles && (
        <div className="styles">
          <div className="text-wrapper-2">h1</div>
          <div className="text-wrapper-3">h2</div>
          <div className="text-wrapper-4">h3</div>
          <div className="text-wrapper-5">h4</div>
          <div className="text-wrapper-6">h5</div>
          <div className="text-wrapper-7">h6</div>
          <div className="text-wrapper-8">btn-text</div>
          <div className="text-wrapper-9">paragraph</div>
          <div className="text-wrapper-10">list</div>
          <div className="text-wrapper-11">link</div>
          <div className="small">Small</div>
        </div>
      )}
    </div>
  );
};

OpenSansMontserrat.propTypes = {
  text: PropTypes.string,
  hasItSABigWorldOut: PropTypes.bool,
  text1: PropTypes.string,
  hasDiv: PropTypes.bool,
  hasStyles: PropTypes.bool,
};
export default OpenSansMontserrat;