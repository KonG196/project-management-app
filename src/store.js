// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './features/projects/projectsSlice';
import tasksReducer from './features/tasks/tasksSlice';
import peopleReducer from './features/people/peopleSlice';

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    people: peopleReducer,
  },
});

export default store;
