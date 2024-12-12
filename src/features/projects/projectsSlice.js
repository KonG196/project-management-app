import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: [],
  reducers: {
    addProject: (state, action) => {
      state.push(action.payload);
    },
    removeProject: (state, action) => {
      return state.filter((project) => project.id !== action.payload.projectId);
    },
    addPersonToProject: (state, action) => {
      const { projectId, personEmail } = action.payload;
      const project = state.find((project) => project.id === projectId);
      if (project && !project.team.includes(personEmail)) {
        project.team.push(personEmail);
      }
    },
    removePersonFromProject: (state, action) => {
      const { projectId, personEmail } = action.payload;
      const project = state.find((project) => project.id === projectId);
      if (project) {
        project.team = project.team.filter((email) => email !== personEmail);
      }
    },
  },
});

export const {
  addProject,
  removeProject,
  addPersonToProject,
  removePersonFromProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;
