import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import ProjectForm from '../features/Employees/Projects/ProjectForm';
import ProjectTable from '../features/Employees/Projects/ProjectTable';
import ConfirmDialog from '../features/Employees/Projects/ConfirmDialog';
import { AppContext } from '../Context/AppContext';

const ProjectManagement = () => {
  const { state, dispatch } = useContext(AppContext);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [formData, setFormData] = useState({
    title: '', description: '', logo: '', startDate: '', endDate: ''
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      dispatch({ type: 'SET_PROJECTS', payload: JSON.parse(savedProjects) });
    }
  }, [dispatch]);
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(state.projects));
  }, [state.projects]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const validateForm = () => {
    if (!formData.title.trim()) return setError('Project title is required'), false;
    if (!formData.description.trim()) return setError('Project description is required'), false;
    if (!formData.startDate) return setError('Start date is required'), false;
    if (!formData.endDate) return setError('End date is required'), false;
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      return setError('End date cannot be before start date'), false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const projectData = { ...formData, id: editId || Date.now() };
    const updatedProjects = editId
      ? state.projects.map(p => (p.id === editId ? projectData : p))
      : [...state.projects, projectData];
    dispatch({ type: 'SET_PROJECTS', payload: updatedProjects });
    resetForm();
  };
  const resetForm = () => {
    setFormData({ title: '', description: '', logo: '', startDate: '', endDate: '' });
    setEditId(null);
    setError('');
  };
  const handleEdit = (project) => {
    setFormData(project);
    setEditId(project.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleDelete = (id) => {
    const updated = state.projects.filter(project => project.id !== id);
    dispatch({ type: 'SET_PROJECTS', payload: updated });
    setConfirmOpen(false);
  };
  const openDeleteConfirm = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };
  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <ProjectForm isMobile={isMobile}formData={formData}handleChange={handleChange}handleSubmit={handleSubmit}resetForm={resetForm}editId={editId}error={error}setError={setError}/>
      <Typography variant="h6" gutterBottom>Project List</Typography>
      <ProjectTable isMobile={isMobile}projects={state.projects}handleEdit={handleEdit}openDeleteConfirm={openDeleteConfirm}/>
      <ConfirmDialog open={confirmOpen}onClose={() => setConfirmOpen(false)}onConfirm={() => handleDelete(deleteId)}/>
    </Box>
  );
};
export default ProjectManagement;