import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: [],
  reducers: {
    addProject: (state, action) => {
      const { id, name, description, team } = action.payload;
      state.push({ id, name, description, team: team || [] });
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
    addPersonToProject: (state, action) => {
      const { projectId, personId } = action.payload;
      const project = state.find((project) => project.id === projectId);
      if (project && !project.team.includes(personId)) {
        project.team.push(personId);
      }
    },
  },
});

export const { addProject, removeProject, updateProject, addPersonToProject } =
  projectsSlice.actions;
export default projectsSlice.reducer;
