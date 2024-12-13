import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './features/projects/projectsSlice';
import tasksReducer from './features/tasks/tasksSlice';
import authReducer from './features/authSlice';

// Завантаження стану з localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('appState');
    return serializedState ? JSON.parse(serializedState) : { projects: [], tasks: [] };
  } catch (error) {
    console.error('Failed to load state:', error);
    return { projects: [], tasks: [] };
  }
};

// Збереження стану до localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      projects: state.projects,
      tasks: state.tasks,
    });
    localStorage.setItem('appState', serializedState);
  } catch (error) {
    console.error('Failed to save state:', error);
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    auth: authReducer,
  },
  preloadedState,
});

// Збереження стану при зміні
store.subscribe(() => {
  const state = store.getState();
  saveState(state);
});

export default store;
