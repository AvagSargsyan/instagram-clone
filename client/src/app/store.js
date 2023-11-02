import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth.slice';
import postReducer from '../features/post/post.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer
  }
});
