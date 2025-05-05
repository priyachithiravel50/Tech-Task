import React, { useContext, useState } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TextField, Typography, IconButton, Alert
} from '@mui/material';
import { AppContext } from '../../context/AppContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Delete, Edit } from '@mui/icons-material';

const ProjectList = () => {
  const { state, dispatch } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    logo: '',
    startDate: null,
    endDate: null,
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      logo: '',
      startDate: null,
      endDate: null,
    });
    setEditId(null);
    setError('');
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Project title is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Project description is required');
      return false;
    }
    if (!formData.logo.trim()) {
      setError('Project logo URL is required');
      return false;
    }
    if (!formData.startDate) {
      setError('Start date is required');
      return false;
    }
    if (!formData.endDate) {
      setError('End date is required');
      return false;
    }
    if (dayjs(formData.endDate).isBefore(dayjs(formData.startDate))) {
      setError('End date cannot be before start date');
      return false;
    }
    return true;
  };

  const handleAddProject = () => {
    if (!validateForm()) return;

    const newProject = {
      ...formData,
      id: editId || Date.now(),
      startDate: formData.startDate.format('YYYY-MM-DD'),
      endDate: formData.endDate.format('YYYY-MM-DD'),
    };

    if (editId) {
      const updatedProjects = state.projects.map(p =>
        p.id === editId ? newProject : p
      );
      dispatch({ type: 'SET_PROJECTS', payload: updatedProjects });
    } else {
      dispatch({ type: 'SET_PROJECTS', payload: [...state.projects, newProject] });
    }

    // Properly reset the form
    setFormData({
      title: '',
      description: '',
      logo: '',
      startDate: null,
      endDate: null,
    });
    setEditId(null);
    setError('');
  };

  const handleDelete = (id) => {
    const updated = state.projects.filter(project => project.id !== id);
    dispatch({ type: 'SET_PROJECTS', payload: updated });
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      logo: project.logo,
      startDate: dayjs(project.startDate),
      endDate: dayjs(project.endDate),
    });
    setEditId(project.id);
    setError('');
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Project Management</Typography>

      <Box 
        component={Paper} 
        p={3} 
        mb={4} 
        display="flex" 
        flexDirection="column" 
        gap={3}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'background.paper'
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Project Title *"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          placeholder="e.g., E-commerce Website Development"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Project Description *"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="Describe the project details..."
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Project Logo URL *"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          placeholder="https://example.com/logo.png"
          InputLabelProps={{ shrink: true }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box display="flex" gap={2} sx={{ '& > *': { flex: 1 } }}>
            <DatePicker
              label="Start Date *"
              value={formData.startDate}
              onChange={(newDate) => setFormData(prev => ({ ...prev, startDate: newDate }))}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  fullWidth 
                  variant="outlined"
                  placeholder="Select start date"
                />
              )}
            />
            <DatePicker
              label="End Date *"
              value={formData.endDate}
              onChange={(newDate) => setFormData(prev => ({ ...prev, endDate: newDate }))}
              minDate={formData.startDate}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  fullWidth 
                  variant="outlined"
                  placeholder="Select end date"
                />
              )}
            />
          </Box>
        </LocalizationProvider>

        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          {editId && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={resetForm}
              sx={{ px: 4 }}
            >
              Cancel
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProject}
            sx={{ px: 4 }}
          >
            {editId ? "Update Project" : "Add Project"}
          </Button>
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom>Project List</Typography>

      <TableContainer 
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden',
          maxHeight: 'calc(100vh - 400px)',
          overflowY: 'auto'
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>Logo</TableCell>
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>Start Date</TableCell>
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>End Date</TableCell>
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No projects found. Please add a project.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              state.projects.map(project => (
                <TableRow
                  key={project.id}
                  hover
                  sx={{
                    '&:nth-of-type(even)': { backgroundColor: 'action.hover' },
                    '&:last-child td': { borderBottom: 0 }
                  }}
                >
                  <TableCell>
                    <Box
                      component="img"
                      src={project.logo}
                      alt={project.title}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 1,
                        objectFit: 'contain',
                        backgroundColor: 'grey.100',
                        p: 0.5
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'medium' }}>{project.title}</TableCell>
                  <TableCell sx={{ 
                    maxWidth: 300,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {project.description}
                  </TableCell>
                  <TableCell>{project.startDate}</TableCell>
                  <TableCell>{project.endDate}</TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => handleEdit(project)} 
                      aria-label="edit"
                      sx={{ 
                        color: 'success.main',
                        '&:hover': { backgroundColor: 'success.light', opacity: 0.8 }
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDelete(project.id)} 
                      aria-label="delete"
                      sx={{ 
                        color: 'error.main',
                        '&:hover': { backgroundColor: 'error.light', opacity: 0.8 }
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProjectList;