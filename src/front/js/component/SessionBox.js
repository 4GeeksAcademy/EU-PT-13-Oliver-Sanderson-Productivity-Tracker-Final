import React, { Component } from "react";
import Session from "./Session";


const SessionBox = (props) => {


    const allSessions = props.sessions.map((session) =>
    <Session theSession={session} />
    );

  return (
    <div>
      <p>
        {allSessions}
      </p>
    </div>
  );
};

export default SessionBox;