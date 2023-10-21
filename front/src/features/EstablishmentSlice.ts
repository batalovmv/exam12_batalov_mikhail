import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../Api/axiosInstance';
export interface CreateReviewDto {
  qualityRating: number;
  serviceRating: number;
  environmentRating: number;
  comment: string;
  userId: number;  
  establishmentId: number; 
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
  user: User;  
  establishment: Establishment;  
  establishmentId: number;  
}

interface Image {
  id: number;
  url: string;
  user: User;  
  establishment: Establishment;  
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
   
    let response = await axiosInstance.post('/establishments', newEstablishment.establishmentData);
    let establishment = response.data as Establishment;

    let formData = new FormData();

    if (newEstablishment.image) {
      formData.append('image', newEstablishment.image);
      formData.append('establishmentId', String(establishment.id)); 

      const imageResponse = await axiosInstance.post('/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Добавляем изображение к заведению
      establishment.images = [imageResponse.data];
    }

    return establishment;
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

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId: number) => {
    const response = await axiosInstance.delete(`/reviews/${reviewId}`);
    return response.data;
  }
);
export const deleteEstablishment = createAsyncThunk(
  'establishments/deleteEstablishment',
  async (establishmentId: number) => {
    const response = await axiosInstance.delete(`/establishments/${establishmentId}`);
    return response.data;
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
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.establishments.forEach(establishment => {
          establishment.reviews = establishment.reviews.filter(review => review.id !== action.payload.id);
        });
      })
      .addCase(deleteReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteEstablishment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.establishments = state.establishments.filter(establishment => establishment.id !== action.payload.id);
      })
      .addCase(deleteEstablishment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteEstablishment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const establishmentReducer =  establishmentSlice.reducer;