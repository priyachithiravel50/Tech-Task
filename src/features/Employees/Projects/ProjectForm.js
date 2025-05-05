// src/features/projects/ProjectForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button, Modal, Select } from '../../components';
import { AppContext } from '../../context/AppContext';

const ProjectForm = ({ open, onClose, project = null }) => {
  const { control, handleSubmit, setValue } = useForm();
  const { state, dispatch } = React.useContext(AppContext);
  const [assignedEmployees, setAssignedEmployees] = useState(project?.assignedEmployees || []);

  useEffect(() => {
    if (project) {
      setValue('title', project.title);
      setValue('description', project.description);
      setAssignedEmployees(project.assignedEmployees);
    }
  }, [project, setValue]);

  const onSubmit = (data) => {
    const newProject = {
      ...data,
      assignedEmployees,
    };
    if (project) {
      dispatch({ type: 'SET_PROJECTS', payload: newProject });
    } else {
      dispatch({ type: 'SET_PROJECTS', payload: [...state.projects, newProject] });
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={project ? 'Edit Project' : 'Add Project'} onSubmit={handleSubmit(onSubmit)}>
      <Input name="title" label="Project Title" control={control} rules={{ required: 'Title is required' }} />
      <Input name="description" label="Description" control={control} />
      <Select name="assignedEmployees" label="Assign Employees" control={control} options={state.employees} />
      <Button variant="contained" color="secondary" onClick={() => onClose()}>
        Cancel
      </Button>
    </Modal>
  );
};

export default ProjectForm;
