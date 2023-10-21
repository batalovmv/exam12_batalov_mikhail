import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../Api/axiosInstance';
export interface CreateReviewDto {
  qualityRating: number;
  serviceRating: number;
  environmentRating: number;
  comment: string;
}
interface User {
  id: number;
  username: string;
  role: string;
}

interface Review {
  id: number;
  qualityRating: number;
  serviceRating: number;
  environmentRating: number;
  comment: string;
}

interface Image {
  id: number;
  url: string;
}

interface Establishment {
  id: number;
  name: string;
  description: string;
  user: User;
  reviews: Review[];
  images: Image[];
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
export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (reviewData: CreateReviewDto) => {
    const response = await axiosInstance.post('/reviews', reviewData);
    return response.data as Review;
  }
);

export const fetchEstablishments = createAsyncThunk(
  'establishments/fetchEstablishments',
  async () => {
    const response = await axiosInstance.get('/establishments');
    console.log(`response.data`, response.data);
    return response.data as Establishment[];
  }
);
export const createEstablishment = createAsyncThunk(
  'establishments/createEstablishment',
  async (newEstablishment: { establishmentData: Omit<Establishment, 'id'>, image: File }) => {
    let formData = new FormData();

    if (newEstablishment.image) {
      formData.append('image', newEstablishment.image);
      const imageResponse = await axiosInstance.post('/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      newEstablishment.establishmentData.images = [imageResponse.data];
    }

    const response = await axiosInstance.post('/establishments', newEstablishment.establishmentData);
    return response.data as Establishment;
  }
);
export const fetchEstablishment = createAsyncThunk(
  'establishments/fetchEstablishment',
  async (id: number) => {
    const response = await axiosInstance.get(`/establishments/${id}`);
    console.log(`response.data for ${id}`, response.data);
    return response.data as Establishment;
  }
);

export const establishmentSlice = createSlice({
  name: 'establishments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchEstablishments.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.establishments = action.payload;
    })
    .addCase(fetchEstablishments.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchEstablishments.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
    .addCase(fetchEstablishment.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.establishments = state.establishments.map(establishment =>
        establishment.id !== action.payload.id ? establishment : action.payload
      );
    })
  .addCase(fetchEstablishment.pending, (state) => {
    state.status = 'loading';
  })
 .addCase(fetchEstablishment.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.error.message;
  })
    .addCase(createEstablishment.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.establishments.push(action.payload);
    })
    .addCase(createEstablishment.pending, (state) => {
      state.status = 'loading';
    })
   
    .addCase(createEstablishment.rejected, (state, action) => {
      console.log(action.error.message);
    })
      .addCase(createReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Найдите заведение, к которому относится отзыв, и добавьте новый отзыв в список отзывов
        const establishmentIndex = state.establishments.findIndex(e => e.id === action.payload.establishmentId);
        if (establishmentIndex !== -1) {
          state.establishments[establishmentIndex].reviews.push(action.payload);
        }
      })
      .addCase(createReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const establishmentReducer =  establishmentSlice.reducer;