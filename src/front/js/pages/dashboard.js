import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import PomodoroTimer from "../component/PomodoroTimer";
import WeatherComponent from "../component/WeatherComponent";
import SessionBox from "../component/SessionBox";
import TaskCard from "../component/TaskCard";

const Dashboard = () => {
  const { store, actions } = useContext(Context);
  const [gotToken, setGotToken] = useState(store.token)
  if (!gotToken) {
    console.log("Redirecting to login.")
    return <Navigate to="/login" />
  }

  useEffect(() => {
    actions.fetchCurrentUserComplete();
  }, []);

  console.log(store.current_sessions);

  const boxStyle = {
    maxHeight: "200px", // Set your desired fixed height
    overflow: "auto", // Enable scrolling if content overflows
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="col-md-12 justify-content-center">
          <h1 className="pt-5 mb-5 display-6 fw-bold">
            Welcome {store.current_user["name"] ? store.current_user["name"] : "User"}, check out your productivity!
          </h1>
        </div>

        <TaskCard />

        <div className="text-wrapper ">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mb-4">
                <PomodoroTimer />
              </div>
              <div className="col-md-6 mb-4">
                <WeatherComponent />
              </div>
            </div>
          </div>
        </div>

        <div className="row weather-box ">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5>Time Spent</h5>
                <p>
                  {store.current_sessions.reduce(function (acc, obj) {
                    return acc + obj.time_spent;
                  }, 0) + " Seconds"}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4" style={boxStyle}>
            <div className="card">
              <div className="card-body">
                <h5>Sessions</h5>
                <hr />
                {store.current_sessions ? (
                  <SessionBox sessions={store.current_sessions} />
                ) : (
                  <div>No recorded sessions!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Dashboard;
