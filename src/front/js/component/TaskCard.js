
import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../store/appContext";

const TaskCard = () => {
  const { store, actions } = useContext(Context);
  const [taskName, setTaskName] = useState('');
  const [taskLink, setTaskLink] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rewardName, setRewardName] = useState('');
  const [rewardLink, setRewardLink] = useState('');
  const [rewardDuration, setRewardDuration] = useState('');
  const [customRewardDuration, setCustomRewardDuration] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log(store)
  });

  const isTaskValid = () => {
    return taskName.trim() !== '' && taskLink.trim() !== '' && rewardName.trim() !== '' && rewardLink.trim() !== '';
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    if (!isTaskValid()) {
      setError('Please fill in all required fields.');
      return;
    }

    const taskToSend = {
      "user_id" : store.current_user.id,
      "page_name" : taskName,
      "page_link" : taskLink,
      "start_date" : startDate,
      "task_time": taskTime === 'custom' ? customRewardDuration : taskTime,
      "end_date" : endDate,
      "reward_name" : rewardName,
      "reward_link" : rewardLink,
      "reward_duration" : rewardDuration === 'custom' ? customRewardDuration : rewardDuration
    }

    // Sending task to backend
    actions.fetchSendTask(taskToSend);
    console.log(actions.fetchTasksCurrentUser()) // Important as forces reload

    // Clear form fields after submission
    setTaskName('');
    setTaskLink('');
    setStartDate('');
    setEndDate('');
    setRewardName('');
    setRewardLink('');
    setRewardDuration('');
    setCustomRewardDuration('');
    setTaskTime('');  // Reset task duration
    setError('');
  };

  const handelDeleteBackend = (taskId) => {
    actions.fetchDeleteTask(taskId)
    console.log(actions.fetchTasksCurrentUser()) // Important as forces reload
  }

  const handleDeleteTask = (taskId) => {
    const updatedTasks = store.current_tasks.filter((task) => task.id !== taskId);
    actions.setStore({ current_tasks: updatedTasks });
  };

  const handleDeleteAllTasks = () => {
    actions.setStore({ current_tasks: [] });
  };

  return (
    <div className="text-start h-100 p-4 bg-body-tertiary border rounded-3 weather-box mb-3">
      <h4 className="display-fw pb-4">Add Task and Reward</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-md-6 ">
          <form onSubmit={handleTaskSubmit}>
            <div className="row align-items-md-stretchx">
              <div className="col-md-6">
                <div className="h-100 p-5 bg-body-tertiary border rounded-3 custom-container weather-box ">
                  <div className="row">
                    <div className="col-md-6 mb-1">
                      <label htmlFor="taskName" className="form-label">
                        Task
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="taskName"
                        placeholder="Creating a calendar"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-1">
                      <label htmlFor="taskLink" className="form-label">
                        Link
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="taskLink"
                        placeholder="https://whereiamworking"
                        value={taskLink}
                        onChange={(e) => setTaskLink(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="col-md-12 mb-1">
                      <label htmlFor="taskTime" className="form-label">
                        Duration 
                      </label>
                      <select
                        className="form-select"
                        id="taskTime"
                        value={taskTime}
                        onChange={(e) => setTaskTime(e.target.value)}
                      >
                        <option value="3600s">1 hour</option>
                        <option value="7200s">2 hours</option>
                        <option value="4400s">4 hours</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-md-6 mb-1">
                      <label htmlFor="startDate" className="form-label">
                        Start
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-1">
                      <label htmlFor="endDate" className="form-label">
                        End
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="h-100 p-5 bg-body-tertiary border

 rounded-3 custom-container weather-box">
                  <div className="row">
                    <div className="col-md-6 mb-1">
                      <label htmlFor="rewardName" className="form-label">
                        Reward
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="rewardName"
                        placeholder="Reward Name"
                        value={rewardName}
                        onChange={(e) => setRewardName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="rewardLink" className="form-label">
                        Link
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="rewardLink"
                        placeholder="https://rewardlink"
                        value={rewardLink}
                        onChange={(e) => setRewardLink(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="rewardDuration" className="form-label">
                      Duration
                    </label>
                    <select
                      className="form-select"
                      id="rewardDuration"
                      value={rewardDuration}
                      onChange={(e) => setRewardDuration(e.target.value)}
                    >
                      <option value="5m">5 minutes</option>
                      <option value="15m">15 minutes</option>
                      <option value="30m">30 minutes</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  {rewardDuration === 'custom' && (
                    <div className="mb-3">
                      <label htmlFor="customRewardDuration" className="form-label">
                        Custom Reward Duration
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="customRewardDuration"
                        placeholder="e.g., 30 minutes"
                        value={customRewardDuration}
                        onChange={(e) => setCustomRewardDuration(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <br/>
            <button
              type="submit"
              className="mx-auto btn btn-secondary d-flex justify-content"
              disabled={!isTaskValid()}
            >
              Done
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h5 className="card-title">Task List </h5>
          {store.current_tasks.length > 0 && (
            <button className="btn btn-danger mb-3" onClick={handleDeleteAllTasks}>
              Delete All Tasks
            </button>
          )}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Task</th>
                <th scope="col">Reward</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Completed?</th>
                <th scope="col">Time remaining</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {store.current_tasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{task.page_name}</td>
                  <td>{task.reward_name}</td>
                  <td>{(task.start_date).slice(0, 16)}</td>
                  <td>{(task.end_date).slice(0, 16)}</td>
                  <td style={store.current_tasks[index].statistics.completed ? { color: 'green' } : { color: 'red' }}>
                    {store.current_tasks[index].statistics.completed ? "Completed" : "Incomplete"}
                  </td>
                  <td style={store.current_tasks[index].statistics.completed ? { color: 'green' } : { color: 'red' }}>
                    {/* Update the logic to handle the task_time input as a string */}
                    {store.current_tasks[index].task_time - store.current_tasks[index].statistics.total_time}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
