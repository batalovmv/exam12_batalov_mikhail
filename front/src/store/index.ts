import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/UserSlice";
import { EstablishmentReducer } from "../features/establishmentSlice";
userReducer

const store = configureStore({
  reducer: {
   users: userReducer,
   establishments:EstablishmentReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
