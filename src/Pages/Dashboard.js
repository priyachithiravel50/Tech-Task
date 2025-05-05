// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { Button } from '../Component/Button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from '../Pages/TaskCard';

const Dashboard = () => {
  const { state } = React.useContext(AppContext);
  const [selectedProject, setSelectedProject] = useState('');

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.index === source.index && destination.droppableId === source.droppableId) return;

    const tasks = Array.from(state.tasks);
    const [removed] = tasks.splice(source.index, 1);
    tasks.splice(destination.index, 0, removed);

    // Update the task order
    dispatch({ type: 'SET_TASKS', payload: tasks });
  };

  const handleProjectFilterChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const filteredTasks = selectedProject
    ? state.tasks.filter((task) => task.projectId === selectedProject)
    : state.tasks;

  return (
    <div>
      <div>
        <select onChange={handleProjectFilterChange} value={selectedProject}>
          <option value="">All Projects</option>
          {state.projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.projectTitle}
            </option>
          ))}
        </select>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="task-columns">
          {['Need to Do', 'In Progress', 'Need for Test', 'Completed', 'Re-open'].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  className="task-column"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h3>{status}</h3>
                  {filteredTasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            className="task-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
