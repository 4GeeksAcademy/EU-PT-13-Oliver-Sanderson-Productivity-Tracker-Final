import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "../../styles/style.css";

const ElevatedMedium = ({ states, leftIcon, rightIcon, className, divClassName, text = "Button" }) => {
  const [state, dispatch] = useReducer(reducer, {
    states: states || "default",
    leftIcon: leftIcon || false,
    rightIcon: rightIcon || false,
  });

  return (
    <div
      className={`elevated-medium ${state.states} ${className}`}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onClick={() => {
        dispatch("click");
      }}
    >
      <div className={`button ${divClassName}`}>
        {["default", "focused", "hovered", "pressed"].includes(state.states) && <>{text}</>}

        {state.states === "disabled" && <>Disabled</>}
      </div>
    </div>
  );
};

function reducer(state, action) {
  if (state.leftIcon === false && state.rightIcon === false && state.states === "default") {
    switch (action) {
      case "mouse_enter":
        return {
          leftIcon: false,
          rightIcon: false,
          states: "hovered",
        };
    }
  }

  if (state.leftIcon === false && state.rightIcon === false && state.states === "hovered") {
    switch (action) {
      case "mouse_leave":
        return {
          leftIcon: false,
          rightIcon: false,
          states: "default",
        };
    }
  }

  if (state.leftIcon === false && state.rightIcon === false && state.states === "pressed") {
    switch (action) {
      case "click":
        return {
          leftIcon: false,
          rightIcon: false,
          states: "default",
        };
    }
  }

  if (state.leftIcon === false && state.rightIcon === false && state.states === "focused") {
    switch (action) {
      case "click":
        return {
          leftIcon: false,
          rightIcon: false,
          states: "pressed",
        };
    }
  }

  return state;
}

ElevatedMedium.propTypes = {
  states: PropTypes.oneOf(["default", "focused", "pressed", "hovered", "disabled"]),
  leftIcon: PropTypes.bool,
  rightIcon: PropTypes.bool,
  text: PropTypes.string,
};
export default ElevatedMedium;