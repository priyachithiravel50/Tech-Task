// src/pages/EmployeeManagement.jsx
import React, { useState, useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import Button from '../Component/Button';
import { useForm } from 'react-hook-form';
import Input from '../Component/Input';
import { v4 as uuidv4 } from 'uuid';

const EmployeeManagement = () => {
  const { state, dispatch } = useContext(AppContext);
  const { register, handleSubmit, control, reset } = useForm();
  const [editingEmployee, setEditingEmployee] = useState(null);

  const onSubmit = (data) => {
    if (editingEmployee) {
      const updatedEmployees = state.employees.map((employee) =>
        employee.id === editingEmployee.id ? { ...employee, ...data } : employee
      );
      dispatch({ type: 'SET_EMPLOYEES', payload: updatedEmployees });
    } else {
      const newEmployee = { id: uuidv4(), ...data };
      dispatch({ type: 'SET_EMPLOYEES', payload: [...state.employees, newEmployee] });
    }
    reset();
    setEditingEmployee(null);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    reset(employee);
  };

  const handleDelete = (id) => {
    const updatedEmployees = state.employees.filter((employee) => employee.id !== id);
    dispatch({ type: 'SET_EMPLOYEES', payload: updatedEmployees });
  };

  return (
    <div>
      <h2>Employee Management</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="name" label="Name" control={control} required />
        <Input name="position" label="Position" control={control} required />
        <Input name="email" label="Email" control={control} required />
        <Input name="profileImage" label="Profile Image URL" control={control} required />
        <Button type="submit">{editingEmployee ? 'Update Employee' : 'Add Employee'}</Button>
      </form>

      <h3>Employee List</h3>
      <ul>
        {state.employees.map((employee) => (
          <li key={employee.id}>
            <div>
              <img src={employee.profileImage} alt="profile" width="50" height="50" />
              <span>{employee.name} - {employee.position}</span>
              <Button onClick={() => handleEdit(employee)}>Edit</Button>
              <Button onClick={() => handleDelete(employee.id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeManagement;
