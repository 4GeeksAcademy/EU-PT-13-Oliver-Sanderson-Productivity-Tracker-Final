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
        <h1> Boost your effectiveness using <strong>KorYoku</strong></h1>
     
       

        <div>
        <div class="col-lg-7 md-5">
         <p className="lead text-muted text-wrap lh-base my-4"> Be part of the 1% with our beta. Maximize accomplishments
          with our chrome extension designed to monitor your browsing time. Take command of your tasks, 
          triumph over your objectives, and leverage your time judiciously.</p>  
        <div className="Create an Account "> <button className=" d-grid gap-4 col-3 Create an Account btn btn-secondary "> Click to start now</button>  </div>
        </div>
        </div> 
        </div><div className="description-content ">
          
      
        
        

        
         
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