import React, { useContext, useState } from 'react';
import { 
  Box, Button, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, IconButton 
} from '@mui/material';
import { AppContext } from '../../Context/AppContext';
import EmployeeForm from './EmployeeForm';
import { Edit, Delete } from '@mui/icons-material';

const EmployeeList = () => {
  const { state } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleOpen = (employee = null) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Employee Management</Typography>
        <Button 
          variant="contained" 
          onClick={() => handleOpen()}
          sx={{ minWidth: 150 }}
        >
          Add Employee
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Photo</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Position</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No employees found. Add your first employee.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              state.employees.map((employee) => (
                <TableRow key={employee.id} hover>
                  <TableCell>
                    <Box
                      component="img"
                      src={employee.profileImage || '/default-avatar.png'}
                      alt={employee.name}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  </TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => handleOpen(employee)}
                      sx={{ color: 'primary.main' }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this employee?')) {
                          const updatedEmployees = state.employees.filter(
                            (emp) => emp.id !== employee.id
                          );
                          dispatch({ type: 'SET_EMPLOYEES', payload: updatedEmployees });
                        }
                      }}
                      sx={{ color: 'error.main' }}
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

      <EmployeeForm 
        open={open} 
        onClose={handleClose} 
        employee={selectedEmployee} 
      />
    </Box>
  );
};

export default EmployeeList;