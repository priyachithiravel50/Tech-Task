import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Edit, Delete } from "@mui/icons-material";
import { AppContext } from "../Context/AppContext";
import Input from "../Component/Input";
import Button from "../Component/Button";

const ProjectManagement = () => {
  const { state, dispatch } = useContext(AppContext);
  const { handleSubmit, control, reset, setValue } = useForm();
  const [editingProject, setEditingProject] = useState(null);

  const onSubmit = (data) => {
    const formattedData = {
      id: editingProject ? editingProject.id : uuidv4(),
      title: data.projectTitle,
      description: data.projectDescription,
      logo: data.projectLogo,
      startDate: data.startDate,
      endDate: data.endDate,
    };

    if (editingProject) {
      const updated = state.projects.map((proj) =>
        proj.id === editingProject.id ? formattedData : proj
      );
      dispatch({ type: "SET_PROJECTS", payload: updated });
    } else {
      dispatch({
        type: "SET_PROJECTS",
        payload: [...state.projects, formattedData],
      });
    }

    reset();
    setEditingProject(null);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setValue("projectTitle", project.title);
    setValue("projectDescription", project.description);
    setValue("projectLogo", project.logo);
    setValue("startDate", project.startDate);
    setValue("endDate", project.endDate);
  };

  const handleDelete = (id) => {
    const updated = state.projects.filter((proj) => proj.id !== id);
    dispatch({ type: "SET_PROJECTS", payload: updated });
  };

  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 700, mx: "auto", mb: 5 }}>
        <Typography variant="h5" mb={2}>
          {editingProject ? "Edit Project" : "Add New Project"}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Input name="projectTitle" label="Project Title" control={control} required />
            <Input name="projectDescription" label="Project Description" control={control} required />
            <Input name="projectLogo" label="Project Logo URL" control={control} required />
            <Input name="startDate" label="Start Date" type="date" control={control} required />
            <Input name="endDate" label="End Date" type="date" control={control} required />
            <Button type="submit">
              {editingProject ? "Update Project" : "Add Project"}
            </Button>
          </Box>
        </form>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Project List
      </Typography>
      <Paper elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Logo</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <img
                    src={project.logo}
                    alt="Logo"
                    style={{ width: 40, height: 40, objectFit: "contain" }}
                  />
                </TableCell>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.startDate}</TableCell>
                <TableCell>{project.endDate}</TableCell>
                <IconButton onClick={() => handleEdit(project)} sx={{ color: 'green', fontSize: 24 }}>
                <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(project.id)} sx={{ color: 'red', fontSize: 24 }}>
                <Delete />
                </IconButton>

              </TableRow>
            ))}
            {state.projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No projects added yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ProjectManagement;
