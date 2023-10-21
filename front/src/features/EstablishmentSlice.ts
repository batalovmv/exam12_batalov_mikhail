import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../Api/axiosInstance';

interface Establishment {
  id: number;
  name: string;
  description: string;
 
}

interface EstablishmentState {
  establishments: Establishment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EstablishmentState = {
  establishments: [],
  status: 'idle',
  error: null,
};

export const fetchEstablishments = createAsyncThunk(
  'establishments/fetchEstablishments',
  async () => {
    const response = await axiosInstance.get('/establishments');
    return response.data as Establishment[];
  }
);

export const establishmentSlice = createSlice({
  name: 'establishments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEstablishments.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.establishments = action.payload;
    });
    builder.addCase(fetchEstablishments.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchEstablishments.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const EstablishmentReducer =  establishmentSlice.reducer;