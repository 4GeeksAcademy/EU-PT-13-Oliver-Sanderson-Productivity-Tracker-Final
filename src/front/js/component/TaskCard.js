import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";

const TaskCard = () => {
  const { store, actions } = useContext(Context);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskLink, setTaskLink] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rewardName, setRewardName] = useState('');
  const [rewardLink, setRewardLink] = useState('');
  const [rewardDuration, setRewardDuration] = useState('');
  const [customRewardDuration, setCustomRewardDuration] = useState('');
  const [error, setError] = useState('');

  const isTaskValid = () => {
    return taskName.trim() !== '' && taskLink.trim() !== '' && rewardName.trim() !== '' && rewardLink.trim() !== '';
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    if (!isTaskValid()) {
      setError('Please fill in all required fields.');
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      taskName,
      taskLink,
      startDate,
      endDate,
      rewardName,
      rewardLink,
      rewardDuration: rewardDuration === 'custom' ? customRewardDuration : rewardDuration,
    };

    const taskToSend = {
      "user_id" : store.current_user.id,
      "page_name" : taskName,
      "page_link" : taskLink,
      "start_date" : startDate,
      "end_date" : endDate,
      "reward_name" : rewardName,
      "reward_link" : rewardLink,
      "reward_duration" : 300 //Currently set as 300 secs as it needs an int value
    }

    setTasks([...tasks, newTask]);

    // Sending task to backend
    actions.fetchSendTask(taskToSend)


    // Clear form fields after submission
    setTaskName('');
    setTaskLink('');
    setStartDate('');
    setEndDate('');
    setRewardName('');
    setRewardLink('');
    setRewardDuration('');
    setCustomRewardDuration('');
    setError('');
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleDeleteAllTasks = () => {
    setTasks([]);
  };

  return (
    <div className="card text-start">
      <div className="card-header">Add a Task and Reward</div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleTaskSubmit}>
              <div className="mb-3">
                <label htmlFor="taskName" className="form-label">
                  Task Name
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

              <div className="mb-3">
                <label htmlFor="taskLink" className="form-label">
                  Task Link
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

              <div className="d-flex">
                <div className="col-md-6 mb-3">
                  <label htmlFor="startDate" className="form-label">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="endDate" className="form-label">
                    End Date
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

              <div className="mb-3">
                <label htmlFor="rewardName" className="form-label">
                  Reward Name
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

              <div className="mb-3">
                <label htmlFor="rewardLink" className="form-label">
                  Reward Link
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

              <div className="mb-3">
                <label htmlFor="rewardDuration" className="form-label">
                  Reward Duration
                </label>
                <select
                  className="form-select"
                  id="rewardDuration"
                  value={rewardDuration}
                  onChange={(e) => setRewardDuration(e.target.value)}
                >
                  <option value="5m">5 minutes</option> {/* Can the values here be in seconds, so 300 for 5 mins? */}
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

              <button
                type="submit"
                className="btn btn-secondary"
                disabled={!isTaskValid()}
              >
                Add Task
              </button>
            </form>
          </div>

          <div className="col-md-6">
            <h5 className="card-title">Task List </h5>
            {tasks.length > 0 && (
              <button className="btn btn-danger mb-3" onClick={handleDeleteAllTasks}>
                Delete All Tasks
              </button>
            )}
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Task</th>
                  <th scope="col">Reward</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <th scope="row">{task.id}</th>
                    <td>{task.taskName}</td>
                    <td>{task.rewardName}</td>
                    <td>{task.startDate}</td>
                    <td>{task.endDate}</td>
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
    </div>
  );
};

export default TaskCard;
