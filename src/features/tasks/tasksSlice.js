import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    removeTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const { id, title } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.title = title;
      }
    },
    updateTaskStatus: (state, action) => {
      const task = state.find((t) => t.id === action.payload.id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    
  },
});

export const { addTask, removeTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
