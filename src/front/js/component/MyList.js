import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

const MyList = ({
  workingTasks,
  rewards,
  handleDeleteWorkingTask,
  handleDeleteReward,
  handleCompleteWorkingTask,
  handleCompleteReward
}) => {
  return (
    <div>
      <h2>My Working Tasks</h2>
      <ul>
        {workingTasks.map((task, index) => (
          <li key={index}>
            <strong>Page Name:</strong> {task.pageName},{" "}
            <strong>Page Link:</strong> {task.pageLink},{" "}
            <strong>Frequency:</strong> {task.frequency},{" "}
            <strong>Start Date:</strong> {task.startDate},{" "}
            <strong>Deadline:</strong> {task.deadline}
            {!task.completed && (
              <>
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
          </li>
        ))}
      </ul>
      <h2>Rewards</h2>
      <ul>
        {rewards.map((reward, index) => (
          <li key={index}>
            <strong>Page Name:</strong> {reward.pageName},{" "}
            <strong>Page Link:</strong> {reward.pageLink},{" "}
            <strong>Frequency:</strong> {reward.frequency},{" "}
            <strong>Start Date:</strong> {reward.startDate},{" "}
            <strong>Deadline:</strong> {reward.deadline}
            {!reward.completed && (
              <>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyList;