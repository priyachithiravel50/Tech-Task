import React, { useState, useEffect, useContext } from 'react';
import { Box, Paper, useMediaQuery } from '@mui/material';
import { AppContext } from '../Context/AppContext';
import EmployeeForm from '../features/Employees/EmployeeForm';
import EmployeeTable from '../features/Employees/EmployeeTable';
import ConfirmDialog from '../features/Employees/Projects/ConfirmDialog';

const EmployeeManagement = () => {
  const { state, dispatch } = useContext(AppContext);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [formData, setFormData] = useState({ name: '', position: '', email: '', profileImage: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  useEffect(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      dispatch({ type: 'SET_EMPLOYEES', payload: JSON.parse(savedEmployees) });
    }
  }, [dispatch]);
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(state.employees));
  }, [state.employees]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const validateForm = () => {
    if (!formData.name.trim()) return setError('Employee name is required'), false;
    if (!formData.position.trim()) return setError('Position is required'), false;
    if (!formData.email.trim()) return setError('Email is required'), false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return setError('Please enter a valid email'), false;
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const employeeData = { ...formData, id: editId || Date.now().toString() };
    if (editId) {
      dispatch({
        type: 'SET_EMPLOYEES',
        payload: state.employees.map(emp => (emp.id === editId ? employeeData : emp))
      });
    } else {
      dispatch({ type: 'SET_EMPLOYEES', payload: [...state.employees, employeeData] });
    }
    resetForm();
  };
  const resetForm = () => {
    setFormData({ name: '', position: '', email: '', profileImage: '' });
    setEditId(null);
    setError('');
  };
  const handleEdit = (employee) => {
    setFormData(employee);
    setEditId(employee.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleDelete = () => {
    dispatch({ type: 'SET_EMPLOYEES', payload: state.employees.filter(e => e.id !== deleteId) });
    setConfirmOpen(false);
  };
  const openDeleteConfirm = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };
  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Paper elevation={3} sx={{ p: isMobile ? 2 : 3, mb: 4, maxWidth: '800px', mx: 'auto' }}>
        <EmployeeForm formData={formData}handleChange={handleChange}handleSubmit={handleSubmit}resetForm={resetForm}editId={editId}error={error}setError={setError}isMobile={isMobile} />
      </Paper>
      <EmployeeTable employees={state.employees}handleEdit={handleEdit}openDeleteConfirm={openDeleteConfirm}isMobile={isMobile}/>
      <ConfirmDialog open={confirmOpen}onClose={() => setConfirmOpen(false)}onConfirm={handleDelete}/>
    </Box>
  );
};
export default EmployeeManagement;