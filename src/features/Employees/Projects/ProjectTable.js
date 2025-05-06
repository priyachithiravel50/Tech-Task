import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper, Box, Typography, IconButton} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const ProjectTable = ({ isMobile, projects, handleEdit, openDeleteConfirm }) => {
  if (projects.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography>No projects found. Please add a project.</Typography>
      </Paper>
    );
  }
  return (
    <TableContainer component={Paper} sx={{ maxHeight: '60vh', border: '1px solid #e0e0e0' }}>
      <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
        <TableHead>
          <TableRow>
            {!isMobile && <TableCell>Logo</TableCell>}
            <TableCell>Title</TableCell>
            {!isMobile && <TableCell>Description</TableCell>}
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map(project => (
            <TableRow key={project.id} hover>
              {!isMobile && (
                <TableCell>
                  {project.logo && (
                    <Box component="img" src={project.logo} alt={project.title}
                      sx={{ width: 40, height: 40, borderRadius: 1 }} />
                  )}
                </TableCell>
              )}
              <TableCell>{project.title}</TableCell>
              {!isMobile && (
                <TableCell sx={{
                  maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>
                  {project.description}
                </TableCell>
              )}
              <TableCell>{project.startDate}</TableCell>
              <TableCell>{project.endDate}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(project)} size="small" color="success">
                  <Edit fontSize={isMobile ? 'small' : 'medium'} />
                </IconButton>
                <IconButton onClick={() => openDeleteConfirm(project.id)} size="small" color="error">
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
export default ProjectTable;