import { configureStore } from "@reduxjs/toolkit";

import divingCentersReducer from "./features/divingCenters/divingCentersSlice";
import equipmentsReducer from "./features/equipments/equipmentsSlice";
import userReducer from "./features/users/userSlice";
export const store = configureStore({
  reducer: {
    divingCentersState: divingCentersReducer,
    userState: userReducer,
    equipmentsState: equipmentsReducer,
  },
});
