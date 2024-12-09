// src/features/projects/projectsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: [],
  reducers: {
    addProject: (state, action) => {
      state.push(action.payload);
    },
    removeProject: (state, action) => {
      return state.filter((project) => project.id !== action.payload);
    },
    updateProject: (state, action) => {
      const { id, name, description } = action.payload;
      const project = state.find((proj) => proj.id === id);
      if (project) {
        project.name = name;
        project.description = description;
      }
    },
  },
});

export const { addProject, removeProject, updateProject } = projectsSlice.actions;
export default projectsSlice.reducer;
