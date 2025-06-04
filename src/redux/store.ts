import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '@/slices/postsSlice';
import authReducer from './authSlice'; // 👈 Yeni ekleme

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer, // 👈 Buraya ekle
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

