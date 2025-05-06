import React, { useState } from 'react';
import {Box,Button,TextField,Typography,Divider,Alert,Chip,Avatar,} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const TaskForm = ({formData,setFormData,handleSubmit,error,setError,resetForm,isMobile,}) => {
  const [imageInput, setImageInput] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddImage = () => {
    if (imageInput.trim() && !formData.images.includes(imageInput)) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageInput],
      }));
      setImageInput('');
    }
  };
  const handleRemoveImage = (imgToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== imgToRemove),
    }));
  };
  return (
    <Box component="form"onSubmit={handleSubmit}sx={{maxWidth: 600,mx: 'auto',width: '100%',p: isMobile ? 1 : 2,bgcolor: 'background.paper',borderRadius: 2,boxShadow: 1,}}>
      <Typography variant="h6" gutterBottom>{formData.id ? 'Edit Task' : 'Create New Task'}</Typography>
      <Divider sx={{ mb: 3 }} />
      {error && (<Alert severity="error"sx={{ mb: 2 }}onClose={() => setError('')}>{error}</Alert>)}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Task Title *"name="title"value={formData.title}onChange={handleChange}fullWidthsize={isMobile ? 'small' : 'medium'}/>
        <TextField label="Description *"name="description"value={formData.description}onChange={handleChange}multilinerows={3}fullWidthsize={isMobile ? 'small' : 'medium'}/>
        <TextField label="Assigned To *"name="assignedTo"value={formData.assignedTo}onChange={handleChange}fullWidthsize={isMobile ? 'small' : 'medium'}/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Due Date *"value={formData.dueDate}onChange={(newValue) =>setFormData({ ...formData, dueDate: newValue })}renderInput={(params) => (<TextField {...params} fullWidth />)}/>
        </LocalizationProvider>
        <TextField label="Priority"name="priority"value={formData.priority}onChange={handleChange}selectfullWidthSelectProps={{ native: true }}>
          {['High', 'Medium', 'Low'].map((option) => (
            <option key={option} value={option}>{option}</option>))}
        </TextField>
        <TextField label="Status"name="status"value={formData.status}onChange={handleChange}selectfullWidthSelectProps={{ native: true }}>
          {['Pending', 'In Progress', 'Completed'].map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}</TextField>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Reference Images</Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <TextField value={imageInput}onChange={(e) => setImageInput(e.target.value)}placeholder="Enter image URL"fullWidth size="small"/>
            <Button onClick={handleAddImage}variant="outlined"size="small">Add</Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {formData.images.map((img, index) => (
              <Chip key={index}avatar={<Avatar alt="Image" src={img} />}label={`Image ${index + 1}`}onDelete={() => handleRemoveImage(img)}/>
            ))}
          </Box>
        </Box>
        <Box sx={{display: 'flex',justifyContent: 'flex-end',gap: 2,mt: 2,}}>
          {formData.id && (
            <Button onClick={resetForm}variant="outlined"size={isMobile ? 'small' : 'medium'}>Cancel</Button>
          )}
          <Button type="submit"variant="contained"size={isMobile ? 'small' : 'medium'}>{formData.id ? 'Update Task' : 'Create Task'}</Button>
        </Box>
      </Box>
    </Box>
  );
};
export default TaskForm;