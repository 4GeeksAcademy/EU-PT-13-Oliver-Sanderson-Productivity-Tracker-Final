import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {
  const [workingTasks, setWorkingTasks] = useState([]);
  const [rewards, setRewards] = useState([]);

  const [workingPageName, setWorkingPageName] = useState("");
  const [workingPageLink, setWorkingPageLink] = useState("");
  const [workingFrequency, setWorkingFrequency] = useState("");
  const [workingStartDate, setWorkingStartDate] = useState("");
  const [workingDeadline, setWorkingDeadline] = useState("");

  const [rewardPageName, setRewardPageName] = useState("");
  const [rewardPageLink, setRewardPageLink] = useState("");
  const [rewardFrequency, setRewardFrequency] = useState("");
  const [rewardStartDate, setRewardStartDate] = useState("");
  const [rewardDeadline, setRewardDeadline] = useState("");

  const handleAddWorkingTask = () => {
    const newTask = {
      pageName: workingPageName,
      pageLink: workingPageLink,
      frequency: workingFrequency,
      startDate: workingStartDate,
      deadline: workingDeadline,
      completed: false
    };
    setWorkingTasks([...workingTasks, newTask]);
    setWorkingPageName("");
    setWorkingPageLink("");
    setWorkingFrequency("");
    setWorkingStartDate("");
    setWorkingDeadline("");
  };

  const handleAddReward = () => {
    const newReward = {
      pageName: rewardPageName,
      pageLink: rewardPageLink,
      frequency: rewardFrequency,
      startDate: rewardStartDate,
      deadline: rewardDeadline,
      completed: false
    };
    setRewards([...rewards, newReward]);
    setRewardPageName("");
    setRewardPageLink("");
    setRewardFrequency("");
    setRewardStartDate("");
    setRewardDeadline("");
  };

  const handleDeleteWorkingTask = (index) => {
    const updatedTasks = [...workingTasks];
    updatedTasks.splice(index, 1);
    setWorkingTasks(updatedTasks);
  };

  const handleDeleteReward = (index) => {
    const updatedRewards = [...rewards];
    updatedRewards.splice(index, 1);
    setRewards(updatedRewards);
  };

  const handleCompleteWorkingTask = (index) => {
    const updatedTasks = [...workingTasks];
    updatedTasks[index].completed = true;
    setWorkingTasks(updatedTasks);
  };

  const handleCompleteReward = (index) => {
    const updatedRewards = [...rewards];
    updatedRewards[index].completed = true;
    setRewards(updatedRewards);
  };

  return (
    <div>
      <h2>Working Tasks</h2>
      <div>
        <input
          type="text"
          placeholder="Page Name"
          value={workingPageName}
          onChange={(e) => setWorkingPageName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Page Link"
          value={workingPageLink}
          onChange={(e) => setWorkingPageLink(e.target.value)}
        />
        <select
          value={workingFrequency}
          onChange={(e) => setWorkingFrequency(e.target.value)}
        >
          <option value="">Select Frequency</option>
          <option value="once">Once</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <button onClick={handleAddWorkingTask}>Add Working Task</button>
      </div>
      <div>
        {workingTasks.map((task, index) => (
          <span key={index}>
            <strong>Page Name:</strong> {task.pageName},{" "}
            <strong>Page Link:</strong> {task.pageLink},{" "}
            <strong>Frequency:</strong> {task.frequency},{" "}
            <strong>Start Date:</strong> {task.startDate},{" "}
            <strong>Deadline:</strong> {task.deadline}
            {!task.completed && (
              <>
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => handleEditWorkingTask(index)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDeleteWorkingTask(index)}
                />
                <FontAwesomeIcon
                  icon={faCheck}
                  onClick={() => handleCompleteWorkingTask(index)}
                />
              </>
            )}
            <br />
               </span>
        ))}
      </div>
      <h2>Rewards</h2>
      <div>
        <input
          type="text"
          placeholder="Page Name"
          value={rewardPageName}
          onChange={(e) => setRewardPageName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Page Link"
          value={rewardPageLink}
          onChange={(e) => setRewardPageLink(e.target.value)}
        />
        <select
          value={rewardFrequency}
          onChange={(e) => setRewardFrequency(e.target.value)}
        >
          <option value="">Select Frequency</option>
          <option value="once">Once</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <button onClick={handleAddReward}>Add Reward</button>
      </div>
      <div>
        {rewards.map((reward, index) => (
          <span key={index}>
            <strong>Page Name:</strong> {reward.pageName},{" "}
            <strong>Page Link:</strong> {reward.pageLink},{" "}
            <strong>Frequency:</strong> {reward.frequency},{" "}
            <strong>Start Date:</strong> {reward.startDate},{" "}
            <strong>Deadline:</strong> {reward.deadline}
            {!reward.completed && (
              <>
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => handleEditReward(index)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDeleteReward(index)}
                />
                <FontAwesomeIcon
                  icon={faCheck}
                  onClick={() => handleCompleteReward(index)}
                />
              </>
            )}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
};

export default TodoList;