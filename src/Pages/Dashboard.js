import React, { useContext } from 'react';
import { Box, Grid, Paper,Typography, Avatar,LinearProgress, Divider,Chip,useMediaQuery} from '@mui/material';
import { AppContext } from '../Context/AppContext';
import TaskCard from '../Pages/TaskCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Dashboard = () => {
  const { state } = useContext(AppContext);
  const isMobile = useMediaQuery('(max-width:600px)');
  const projectCount = state.projects.length;
  const employeeCount = state.employees.length;
  const taskCount = state.tasks.length;
  const completedTasks = state.tasks.filter(task => task.status === 'Completed').length;
  const completionRate = taskCount > 0 ? Math.round((completedTasks / taskCount) * 100) : 0;
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const tasks = Array.from(state.tasks);
    const [reorderedTask] = tasks.splice(result.source.index, 1);
    tasks.splice(result.destination.index, 0, reorderedTask);
  };
  const statusColumns = ['Pending', 'In Progress', 'Completed', 'Reopen'];

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={6} md={3}>
          <Paper elevation={3} sx={{ px:16,py:4, textAlign: 'center' }}>
            <Typography variant="h6">Projects</Typography>
            <Typography variant="h4" sx={{ my: 1 }}>{projectCount}</Typography>
            <LinearProgress variant="determinate" value={100} color="primary"sx={{ height: 8, borderRadius: 4 }}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ px:15,py:4, textAlign: 'center' }}>
            <Typography variant="h6">Employees</Typography>
            <Typography variant="h4" sx={{ my: 1 }}>{employeeCount}</Typography>
            <LinearProgress variant="determinate" value={100} color="secondary"sx={{ height: 8, borderRadius: 4 }}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ px:14,py:4, textAlign: 'center' }}>
            <Typography variant="h6">Total Tasks</Typography>
            <Typography variant="h4" sx={{ my: 1 }}>{taskCount}</Typography>
            <LinearProgress variant="determinate" value={100} color="info"sx={{ height: 8, borderRadius: 4 }}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ px:12,py:4, textAlign: 'center' }}>
            <Typography variant="h6">Completion Rate</Typography>
            <Typography variant="h4" sx={{ my: 1 }}>{completionRate}%</Typography>
            <LinearProgress  variant="determinate" value={completionRate} color="success"sx={{ height: 8, borderRadius: 4 }}/>
          </Paper>
        </Grid>
      </Grid>
      <Paper elevation={3} sx={{ p: 7, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Recent Projects</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {state.projects.slice(0, 4).map(project => (
        <Grid item xs={12} sm={6} md={3} key={project.id}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              {project.logo && (<Avatar src={project.logo} sx={{ mr: 2 }} />)}
              <Typography variant="subtitle1">{project.title}</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box',WebkitLineClamp: 2,WebkitBoxOrient: 'vertical',overflow: 'hidden'}}>{project.description}</Typography>
            <Chip label={`${project.tasks?.length || 0} tasks`} size="small" sx={{ mt: 1 }}/>
           </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Task Board</Typography>
        <Divider sx={{ mb: 2 }} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Grid container spacing={2}>
          {statusColumns.map(status => (
            <Grid item xs={12} sm={6} md={3} key={status}>
              <Droppable droppableId={status}>
            {(provided) => (
            <Paper {...provided.droppableProps}ref={provided.innerRef}sx={{ py: 1,px:14, minHeight: '50px',backgroundColor: 'background.default'}}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>{status} ({state.tasks.filter(t => t.status === status).length})</Typography>
                {state.tasks.filter(task => task.status === status).map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <Box ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}sx={{ mb: 2, }}>
                    <TaskCard task={task} />
                    </Box>
                  )}
                </Draggable>
              ))}
                  {provided.placeholder}
                </Paper>
              )}
                </Droppable>
              </Grid>
            ))}
          </Grid>
        </DragDropContext>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Team Members</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
        {state.employees.slice(0, 6).map(employee => (
          <Grid item xs={12} sm={6} md={4} key={employee.id}>
            <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar src={employee.profileImage} sx={{ width: 56, height: 56, mr: 2 }}/>
            <Box>
              <Typography variant="subtitle1">{employee.name}</Typography>
              <Typography variant="body2" color="text.secondary">{employee.position}</Typography>
              <Chip label={`${employee.tasks?.length || 0} tasks`} size="small" sx={{ mt: 1 }}/>
              </Box>
            </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};
export default Dashboard;