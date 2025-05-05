// src/features/tasks/TaskForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button, Modal, Select } from '../../components';
import { AppContext } from '../../Context/AppContext';

const TaskForm = ({ open, onClose, task = null }) => {
  const { control, handleSubmit, setValue } = useForm();
  const { state, dispatch } = React.useContext(AppContext);
  const [selectedEmployee, setSelectedEmployee] = useState(task?.assignedEmployee || '');

  useEffect(() => {
    if (task) {
      setValue('taskTitle', task.taskTitle);
      setValue('taskDescription', task.taskDescription);
      setSelectedEmployee(task.assignedEmployee);
    }
  }, [task, setValue]);

  const onSubmit = (data) => {
    const newTask = {
      ...data,
      assignedEmployee: selectedEmployee,
      taskStatus: 'Need to Do', // Default task status
      id: task ? task.id : Date.now().toString(),
    };
    if (task) {
      const updatedTasks = state.tasks.map(t => t.id === task.id ? newTask : t);
      dispatch({ type: 'SET_TASKS', payload: updatedTasks });
    } else {
      const updatedTasks = [...state.tasks, newTask];
      dispatch({ type: 'SET_TASKS', payload: updatedTasks });
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={task ? 'Edit Task' : 'Add Task'} onSubmit={handleSubmit(onSubmit)}>
      <Input name="taskTitle" label="Task Title" control={control} rules={{ required: 'Task title is required' }} />
      <Input name="taskDescription" label="Task Description" control={control} rules={{ required: 'Task description is required' }} />
      <Select
        name="assignedEmployee"
        label="Assign Employee"
        control={control}
        options={state.employees.map(emp => ({ label: emp.name, value: emp.id }))}
        value={selectedEmployee}
        onChange={(e) => setSelectedEmployee(e.target.value)}
        rules={{ required: 'Assigning employee is required' }}
      />
      <Button variant="contained" color="secondary" onClick={() => onClose()}>
        Cancel
      </Button>
    </Modal>
  );
};

export default TaskForm;
