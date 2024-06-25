import { configureStore } from "@reduxjs/toolkit";

import divingCentersReducer from "./features/divingCenters/divingCentersSlice";

export const store = configureStore({
  reducer: {
    divingCentersState: divingCentersReducer,
  },
});
