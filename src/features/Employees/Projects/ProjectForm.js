import React from 'react';
import {Box, Button, TextField, Typography, Alert, Divider, Paper} from '@mui/material';

const ProjectForm = ({ isMobile, formData, handleChange, handleSubmit, resetForm, editId, error, setError}) => {
  return (
    <Paper elevation={3} sx={{ p: isMobile ? 2 : 3, mb: 4, maxWidth: '800px', mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>{editId ? 'Edit Project' : 'Add New Project'}</Typography>
      <Divider sx={{ mb: 3 }} />
      {error && (<Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>)}
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Project Title *"name="title"value={formData.title}onChange={handleChange}fullWidthsize={isMobile ? 'small' : 'medium'}/>
          <TextField label="Description *"name="description"value={formData.description}onChange={handleChange}multilinerows={3}fullWidth size={isMobile ? 'small' : 'medium'}/>
          <TextField label="Logo URL"name="logo"value={formData.logo}onChange={handleChange}fullWidthsize={isMobile ? 'small' : 'medium'}/>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
            <TextField label="Start Date *"name="startDate"type="date"value={formData.startDate}onChange={handleChange}fullWidthInputLabelProps={{ shrink: true }}size={isMobile ? 'small' : 'medium'}/>
            <TextField label="End Date *"name="endDate"type="date"value={formData.endDate}onChange={handleChange}fullWidthInputLabelProps={{ shrink: true }}size={isMobile ? 'small' : 'medium'}/>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            {editId && (<Button onClick={resetForm} variant="outlined" size={isMobile ? 'small' : 'medium'}>Cancel</Button>)}
            <Button type="submit" variant="contained" size={isMobile ? 'small' : 'medium'}>
              {editId ? 'Update Project' : 'Add Project'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
export default ProjectForm;