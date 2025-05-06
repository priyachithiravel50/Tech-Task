import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar, Typography} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const EmployeeTable = ({ employees, handleEdit, openDeleteConfirm, isMobile }) => {
  if (employees.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography>No employees found. Please add an employee.</Typography>
      </Paper>
    );
  }
  return (
    <TableContainer component={Paper} sx={{ maxHeight: '60vh', overflow: 'auto', border: '1px solid #e0e0e0' }}>
      <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
        <TableHead>
          <TableRow>
            <TableCell>Photo</TableCell>
            <TableCell>Name</TableCell>
            {!isMobile && <TableCell>Email</TableCell>}
            <TableCell>Position</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id} hover>
              <TableCell>
                <Avatar src={employee.profileImage || '/default-avatar.png'} alt={employee.name} sx={{ width: 40, height: 40 }} />
              </TableCell>
              <TableCell>{employee.name}</TableCell>
              {!isMobile && <TableCell>{employee.email}</TableCell>}
              <TableCell>{employee.position}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(employee)} size="small" color="primary">
                  <Edit fontSize={isMobile ? 'small' : 'medium'} />
                </IconButton>
                <IconButton onClick={() => openDeleteConfirm(employee.id)} size="small" color="error">
                  <Delete fontSize={isMobile ? 'small' : 'medium'} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default EmployeeTable;