// src/pages/TaskManagement.jsx
import React, { useState, useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import Button from '../Component/Button';
import { useForm } from 'react-hook-form';
import Input from '../Component/Input';
import { v4 as uuidv4 } from 'uuid';

const TaskManagement = () => {
  const { state, dispatch } = useContext(AppContext);
  const { register, handleSubmit, control, reset } = useForm();
  const [editingTask, setEditingTask] = useState(null);

  const onSubmit = (data) => {
    if (editingTask) {
      const updatedTasks = state.tasks.map((task) =>
        task.id === editingTask.id ? { ...task, ...data } : task
      );
      dispatch({ type: 'SET_TASKS', payload: updatedTasks });
    } else {
      const newTask = { id: uuidv4(), ...data };
      dispatch({ type: 'SET_TASKS', payload: [...state.tasks, newTask] });
    }
    reset();
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    reset(task);
  };

  const handleDelete = (id) => {
    const updatedTasks = state.tasks.filter((task) => task.id !== id);
    dispatch({ type: 'SET_TASKS', payload: updatedTasks });
  };

  return (
    <div>
      <h2>Task Management</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="taskTitle" label="Task Title" control={control} required />
        <Input name="taskDescription" label="Task Description" control={control} required />
        <Input name="assignedEmployee" label="Assigned Employee" control={control} required />
        <Input name="eta" label="ETA" control={control} required />
        <Input name="referenceImages" label="Reference Image URLs" control={control} required />
        <Button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</Button>
      </form>

      <h3>Task List</h3>
      <ul>
        {state.tasks.map((task) => (
          <li key={task.id}>
            <div>
              <span>{task.taskTitle}</span>
              <Button onClick={() => handleEdit(task)}>Edit</Button>
              <Button onClick={() => handleDelete(task.id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManagement;
