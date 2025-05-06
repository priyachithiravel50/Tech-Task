import React from 'react';
import {TextField, Button, Box, Typography, Divider, Alert, Avatar} from '@mui/material';

const EmployeeForm = ({
  formData, handleChange, handleSubmit, resetForm,
  editId, error, setError, isMobile
}) => {
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>{editId ? 'Edit Employee' : 'Add New Employee'}</Typography>
      <Divider sx={{ mb: 3 }} />
      {error && (<Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>)}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Full Name *" name="name" value={formData.name} onChange={handleChange} fullWidth size={isMobile ? 'small' : 'medium'} />
        <TextField label="Position *" name="position" value={formData.position} onChange={handleChange} fullWidth size={isMobile ? 'small' : 'medium'} />
        <TextField label="Email *" name="email" value={formData.email} onChange={handleChange} type="email" fullWidth size={isMobile ? 'small' : 'medium'} />
        <TextField label="Profile Image URL" name="profileImage" value={formData.profileImage} onChange={handleChange} fullWidth size={isMobile ? 'small' : 'medium'} placeholder="https://example.com/photo.jpg" />
        {formData.profileImage && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={formData.profileImage} alt="Preview" sx={{ width: 80, height: 80 }} />
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          {editId && (
            <Button onClick={resetForm} variant="outlined" size={isMobile ? 'small' : 'medium'}>Cancel</Button>
          )}
          <Button type="submit" variant="contained" size={isMobile ? 'small' : 'medium'}>
            {editId ? 'Update Employee' : 'Add Employee'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default EmployeeForm;