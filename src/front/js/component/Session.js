import React, { Component } from "react";


const Session = (props) => {

  return (
    <div key={props.theSession.id}>
    <div className="row">
    <div className="col-8">
      <b>Date:</b> {props.theSession.date}
    </div>
    <div className="col-4">
        For {props.theSession.time_spent} seconds.
    </div>
    </div>
    <div className="row">
      <div className="col-12">
        <b>URL visited:</b> {props.theSession.url}
      </div>
      <hr></hr>
    </div>
    </div>
  );
};

export default Session;