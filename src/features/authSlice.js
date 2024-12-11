import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('isAuthenticated');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
