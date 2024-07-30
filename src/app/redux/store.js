import { configureStore } from "@reduxjs/toolkit";
import restroReducer from "./slice";

export const store = configureStore({
  reducer: restroReducer,
});
