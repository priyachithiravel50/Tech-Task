// src/features/tasks/TaskCard.jsx
import React from 'react';

const TaskCard = ({ task }) => {
  return (
    <div className="task-card-content">
      <h4>{task.taskTitle}</h4>
      <p>{task.taskDescription}</p>
      <p><strong>Assigned To:</strong> {task.assignedEmployee}</p>
      <p><strong>ETA:</strong> {task.eta}</p>
      {task.referenceImages && task.referenceImages.length > 0 && (
        <div>
          <strong>Reference Images:</strong>
          {task.referenceImages.map((image, index) => (
            <img key={index} src={image} alt={`task-image-${index}`} width="50" height="50" />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
