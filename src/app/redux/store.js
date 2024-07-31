import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import restroReducer from "./restroSlice";

export const store = configureStore({
  reducer: {
    userData: userReducer,
    restroData: restroReducer,
  },
});
