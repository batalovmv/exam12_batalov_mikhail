import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../Api/axiosInstance';

interface User {
  username: string;
  password: string;
  role: string;
  token: string;
}

interface UserError {
  message: string;
}
interface CreateUserDto {
  username: string;
  password: string;
}
interface LoginUserDto {
  username: string;
  password: string;
}

export const registerUser = createAsyncThunk<User, CreateUserDto, { rejectValue: UserError }>(
  'users/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<User>('/users/register', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue({ message: error.message || 'Unknown error' });
    }
  }
);

export const loginUser = createAsyncThunk<User, LoginUserDto, { rejectValue: UserError }>(
  'users/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<User>('/users/login', loginData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue({ message: error.message || 'Unknown error' });
    }
  }
);

interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: UserError | null;
}

const initialState: UserState = { user: null, status: 'idle', error: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<UserError | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || null;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<UserError | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || null;
      });
  },
});


export const { logoutUser } = userSlice.actions;

export const userReducer = userSlice.reducer;