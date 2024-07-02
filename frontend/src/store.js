import { configureStore } from "@reduxjs/toolkit";

import divingCentersReducer from "./features/divingCenters/divingCentersSlice";
import userReducer from "./features/users/userSlice";
export const store = configureStore({
  reducer: {
    divingCentersState: divingCentersReducer,
    userState: userReducer,
  },
});
