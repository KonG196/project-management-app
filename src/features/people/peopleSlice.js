import { createSlice } from '@reduxjs/toolkit';

const peopleSlice = createSlice({
  name: 'people',
  initialState: [],
  reducers: {
    addPerson: (state, action) => {
      state.push(action.payload);
    },
    removePerson: (state, action) => {
      return state.filter((person) => person.id !== action.payload);
    },
    updatePerson: (state, action) => {
      const { id, name } = action.payload;
      const person = state.find((person) => person.id === id);
      if (person) {
        person.name = name;
      }
    },
  },
});

export const { addPerson, removePerson, updatePerson } = peopleSlice.actions;
export default peopleSlice.reducer;
