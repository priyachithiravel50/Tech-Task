import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button, Modal, ImageUpload } from '../../components';
import { AppContext } from '../../Context/AppContext';
import { Box, Typography } from '@mui/material';

const EmployeeForm = ({ open, onClose, employee = null }) => {
  const { control, handleSubmit, setValue, reset } = useForm();
  const { state, dispatch } = React.useContext(AppContext);
  const [profileImage, setProfileImage] = useState(employee?.profileImage || '');

  useEffect(() => {
    if (employee) {
      setValue('name', employee.name);
      setValue('position', employee.position);
      setValue('email', employee.email);
      setProfileImage(employee.profileImage);
    } else {
      reset();
      setProfileImage('');
    }
  }, [employee, setValue, reset]);

  const onSubmit = (data) => {
    const newEmployee = {
      ...data,
      profileImage,
    };
    
    if (employee) {
      const updatedEmployees = state.employees.map(emp =>
        emp.id === employee.id ? newEmployee : emp
      );
      dispatch({ type: 'SET_EMPLOYEES', payload: updatedEmployees });
    } else {
      const newId = Date.now().toString();
      dispatch({ type: 'SET_EMPLOYEES', payload: [...state.employees, { id: newId, ...newEmployee }]});
    }
    onClose();
  };

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title={employee ? 'Edit Employee' : 'Add Employee'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Input 
          name="name" 
          label="Full Name" 
          control={control} 
          rules={{ required: 'Name is required' }}
          placeholder="Enter employee full name"
        />
        <Input 
          name="position" 
          label="Position" 
          control={control} 
          rules={{ required: 'Position is required' }}
          placeholder="Enter job position"
        />
        <Input 
          name="email" 
          label="Email" 
          control={control} 
          rules={{ 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          }}
          placeholder="Enter work email"
        />
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>Profile Image</Typography>
          <ImageUpload 
            value={profileImage}
            onChange={setProfileImage}
            placeholder="Upload employee photo"
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default EmployeeForm;