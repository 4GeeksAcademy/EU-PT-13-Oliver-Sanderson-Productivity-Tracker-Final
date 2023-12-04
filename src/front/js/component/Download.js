import React, { Component } from "react";
import icon from "../../img/icon.png";


const Download = () => {

  return (
    <div className="container bg-transparent border-end-0 border-start-0 border-top border-bottom border mx-auto py-5">
    <div className="row">
    <div className="col-3">
    </div>
    <div className="col-4">
      <p>Download the TimeTracker chrome extension from the related GitHub repo.</p>
        <a href="https://github.com/Oliver343/chromex" download>Download extension here.</a>
    </div>
    <div className="col-2">
        <img src={icon} width="75px"></img>
    </div>
    <div className="col-3">
    </div>
    </div>
    </div>
  );
};

export default Download;