import React from "react";
import ElevatedMedium from "./ElevatedMedium";
import MockupSaas from "./MockupSaas";
import OpenSansMontserrat from "./OpenSansMontserrat";
import "../../styles/style.css";

const Description = () => {
  return (
    <div className="description">
      <div className="overlap-group">
      <div className="heading-container">
        <h2 className="heading">Enhance Productivity and Acheive greater efficiency</h2>
        </div>
        <div className="description-content">
          <OpenSansMontserrat
            className="open-sans-montserrat-instance"
            embraceLifeSClassName="open-sans-montserrat-2"
            hasDiv={false}
            hasItSABigWorldOut={false}
            hasStyles={false}
            itSABigWorldOutClassName="design-component-instance-node"
            text=""
            text1="Stay organized, focused, and achieve more with our powerful productivity web app to monitor your browing time.     
                 Take control of your tasks, conquer your goals. 
                 Utilize your time wisely."
          />
          <ElevatedMedium
            className="elevated-medium-elevated-button"
            divClassName="elevated-medium-instance"
            leftIcon={false}
            rightIcon={false}
            states="default"
            text="Create an Account"
          />
        </div>
        <div className="ellipse" />
        <div className="rectangle-2" />
        <MockupSaas
          className="mockup-saas-instance"
          rectangle="https://c.animaapp.com/me0UN20d/img/rectangle-21-1.png"
          rectangleClassName="mockup-saas-2"
        />
      </div>
    </div>
  );
};

export default Description;