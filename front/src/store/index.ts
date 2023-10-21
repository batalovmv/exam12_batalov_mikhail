import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/user/userSlice";

import { cocktailReducer } from "../features/cocktails/cocktailsSlice";
import { ingredientReducer } from "../features/ingredients/ingredientsSlice";
import { ratingReducer } from "../features/rating/ratingSlice";

const store = configureStore({
  reducer: {
   users: userReducer,
    cocktails:cocktailReducer,
    ingredients: ingredientReducer,
    ratings: ratingReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
