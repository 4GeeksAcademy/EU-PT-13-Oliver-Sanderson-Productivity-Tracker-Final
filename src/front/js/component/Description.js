import React from "react";
import { ElevatedMedium } from "../../components/ElevatedMedium";
import { MockupSaas } from "../../components/MockupSaas";
import { OpenSansMontserrat } from "../../components/OpenSansMontserrat";
import "../../styles/style.css";

const Description = () => {
  return (
    <div className="description">
      <div className="overlap-group">
        <OpenSansMontserrat
          className="open-sans-montserrat-instance"
          embraceLifeSClassName="open-sans-montserrat-2"
          hasDiv={false}
          hasItSABigWorldOut={false}
          hasStyles={false}
          itSABigWorldOutClassName="design-component-instance-node"
          text=""
          text1="Stay organized, focused, and achieve more with our powerful productivity web app. Take control of your tasks, conquer your goals. Utilize your time wisely."
        />
        <p className="p">Enhance Productivity and Achieve Greater Efficiency</p>
        <ElevatedMedium
          className="elevated-medium-elevated-button"
          divClassName="elevated-medium-instance"
          leftIcon={false}
          rightIcon={false}
          states="default"
          text="Create an Account"
        />
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