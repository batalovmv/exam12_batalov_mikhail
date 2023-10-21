import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/UserSlice";
import { establishmentReducer } from "../features/EstablishmentSlice";

userReducer

const store = configureStore({
  reducer: {
   users: userReducer,
   establishments:establishmentReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
