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
    actions.fetchCurrentUserComplete()
  }, []);

  console.log(store.current_sessions)

  const boxStyle = {
    maxHeight: '200px', // Set your desired fixed height
    overflow: 'auto', // Enable scrolling if content overflows
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <TaskCard />
              </div>
            </div>
          </div>

          <div className="text-wrapper">
            <div className="container">
              <div className="row row-cols-2 row-cols-md-4 g-1">
                <div className=" col-md-8">
                  <div className="card">
                    <div className="card-body">
                      <h1>Welcome {store.current_user["name"]}</h1>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card">
                    <div className="card-body">
                      {/* <Weather /> */}
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card">
                    <div>
                      <PomodoroTimer />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <PomodoroTimer />
              </div>

               {/* <Weather /> */}
            </div>
          </div>
        </div>
      </div>
      <div className=" col-md-4">
        <div className="card">
          <div className="card-body">
            <h5>Completed Tasks</h5>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Time Spent</h5>
              <p>{store.current_sessions.reduce(function (acc, obj) { return acc + obj.time_spent; }, 0) + " Seconds"}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4" style={boxStyle}>
          <div className="card">
            <div className="card-body">
              <h5>Sessions</h5>
              <hr></hr>
              {store.current_sessions ? <SessionBox sessions={store.current_sessions} /> : <div>No recorded sessions!</div>}
            </div>
          </div>
        </div>

        <div className=" col-md-8"></div>
        <div className=" col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p>Time Spent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;