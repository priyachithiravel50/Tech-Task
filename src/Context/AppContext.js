// src/context/AppContext.jsx
import { createContext, useReducer, useEffect } from 'react';

const initialState = {
  employees: [],
  projects: [],
  tasks: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_EMPLOYEES':
      return { ...state, employees: action.payload };
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
}

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    return {
      employees: JSON.parse(localStorage.getItem('employees')) || [],
      projects: JSON.parse(localStorage.getItem('projects')) || [],
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    };
  });

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(state.employees));
    localStorage.setItem('projects', JSON.stringify(state.projects));
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
