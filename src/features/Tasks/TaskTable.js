import React from 'react';
import {Box,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,IconButton,Chip,Typography,} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const TaskTable = ({ tasks, handleEdit, openDeleteConfirm, isMobile }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'info';
      case 'Pending': return 'warning';
      default: return 'default';
    }
  };
  return (
    <Box sx={{ mt: 4, maxWidth: '100%', mx: 'auto', px: isMobile ? 1 : 3 }}>
      <Typography variant="h6" gutterBottom>Task List</Typography>
      <Paper elevation={3} sx={{ borderRadius: 3 }}>
        <TableContainer>
          <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.light' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                {!isMobile && (
                  <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                )}
                <TableCell sx={{ fontWeight: 'bold' }}>Assigned To</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Due Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {tasks.map((task, index) => (
            <TableRow key={task.id}sx={{backgroundColor: index % 2 === 0 ? 'background.default' : 'grey.100',transition: 'background 0.3s','&:hover': {backgroundColor: 'action.hover',},}}>
                  <TableCell>{task.title}</TableCell>
                  {!isMobile && <TableCell>{task.description}</TableCell>}
                  <TableCell>{task.assignedTo}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell><Chip label={task.priority} color={getPriorityColor(task.priority)}size="small"/></TableCell>
                  <TableCell><Chip label={task.status}color={getStatusColor(task.status)}size="small"/>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton onClick={() => handleEdit(task)}color="primary"size="small"><Edit /></IconButton>
                      <IconButton onClick={() => openDeleteConfirm(task.id)}color="error"size="small"><Delete /></IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {tasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">No tasks found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
export default TaskTable;