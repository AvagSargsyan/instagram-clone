import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './post.service';

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Get all posts
export const getAllPosts = createAsyncThunk(
  'post/getAllPosts',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await postService.getAllPosts(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get own posts
export const getOwnPosts = createAsyncThunk(
  'post/getOwnPosts',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await postService.getOwnPosts(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      .addCase(getOwnPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOwnPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getOwnPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

  }
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
