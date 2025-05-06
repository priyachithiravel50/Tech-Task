import React, { useState, useEffect, useContext } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import TaskForm from '../features/Tasks/TaskForm';
import TaskTable from '../features/Tasks/TaskTable';
import { AppContext } from '../Context/AppContext';
import ConfirmDialog from '../features/Employees/Projects/ConfirmDialog';
import dayjs from 'dayjs';

const TaskManagement = () => {
  const { state, dispatch } = useContext(AppContext);
  const [formData, setFormData] = useState({ title: '', description: '', assignedTo: '', dueDate: null, status: 'Pending', priority: 'Medium', images: [] });
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      dispatch({ type: 'SET_TASKS', payload: JSON.parse(savedTasks) });
    }
  }, [dispatch]);
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.assignedTo || !formData.dueDate) {
      setError('All fields are required');
      return;
    }
    const taskData = { ...formData, id: editId || Date.now().toString(), dueDate: formData.dueDate.format('YYYY-MM-DD') };
    if (editId) {
      const updatedTasks = state.tasks.map(task => task.id === editId ? taskData : task);
      dispatch({ type: 'SET_TASKS', payload: updatedTasks });
    } else {
      dispatch({ type: 'SET_TASKS', payload: [...state.tasks, taskData] });
    }
    setFormData({ title: '', description: '', assignedTo: '', dueDate: null, status: 'Pending', priority: 'Medium', images: [] });
    setEditId(null);
    setError('');
  };
  const handleEdit = (task) => {
    setFormData({ ...task, dueDate: dayjs(task.dueDate) });
    setEditId(task.id);
  };
  const openDeleteConfirm = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };
  const handleDelete = (id) => {
    const updated = state.tasks.filter(task => task.id !== id);
    dispatch({ type: 'SET_TASKS', payload: updated });
    setConfirmOpen(false);
  };
  return (
    <Box sx={{ padding: 3 }}>
        <Typography variant="h5"  gutterBottom >Task Management</Typography>
        <TaskForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} error={error} setError={setError} isMobile={false} resetForm={() => setFormData({ title: '', description: '', assignedTo: '', dueDate: null, status: 'Pending', priority: 'Medium', images: [] })} />
      <Box sx={{ marginTop: 3 }}>
        <TaskTable tasks={state.tasks} handleEdit={handleEdit} openDeleteConfirm={openDeleteConfirm} isMobile={false} />
      </Box>
      <ConfirmDialog confirmOpen={confirmOpen} setConfirmOpen={setConfirmOpen} handleDelete={handleDelete} deleteId={deleteId} />
    </Box>
  );
};
export default TaskManagement;