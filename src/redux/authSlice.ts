import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: null | {
    id: string;
    username: string;
  };
}

const initialState: AuthState = {
  user: null, // ✅ Artık başlangıçta giriş yapılmamış kabul edilir
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

