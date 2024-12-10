import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './features/projects/projectsSlice';
import tasksReducer from './features/tasks/tasksSlice';
import peopleReducer from './features/people/peopleSlice';
import authReducer from './features/authSlice';

// Завантаження стану з localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('appState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error('Failed to load state:', error);
    return undefined;
  }
};

// Збереження стану до localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
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
    people: peopleReducer,
    auth: authReducer
  },
  preloadedState,
});

// Збереження стану при зміні
store.subscribe(() => {
  saveState({
    projects: store.getState().projects,
    tasks: store.getState().tasks,
    people: store.getState().people,
  });
});

export default store;
