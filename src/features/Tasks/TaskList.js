// src/features/tasks/TaskList.jsx
import React, { useContext, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import { Button } from '../../components';
import TaskForm from './TaskForm';

const TaskList = () => {
  const { state, dispatch } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleOpen = (task = null) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleDelete = (id) => {
    const updatedTasks = state.tasks.filter((task) => task.id !== id);
    dispatch({ type: 'SET_TASKS', payload: updatedTasks });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updatedTasks = Array.from(state.tasks);
    const [reorderedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, reorderedTask);
    dispatch({ type: 'SET_TASKS', payload: updatedTasks });
  };

  return (
    <div>
      <Button onClick={() => handleOpen()}>Add Task</Button>
      <div>
        {state.tasks.map((task) => (
          <div key={task.id} draggable onDragEnd={handleDragEnd}>
            <span>{task.taskTitle}</span>
            <span>{task.assignedEmployee}</span>
            <Button onClick={() => handleOpen(task)}>Edit</Button>
            <Button onClick={() => handleDelete(task.id)}>Delete</Button>
          </div>
        ))}
      </div>
      <TaskForm open={open} onClose={() => setOpen(false)} task={selectedTask} />
    </div>
  );
};

export default TaskList;
