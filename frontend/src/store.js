import { configureStore } from "@reduxjs/toolkit";

import divingCentersReducer from "./features/divingCenters/divingCentersSlice";
import equipmentsReducer from "./features/equipments/equipmentsSlice";
import userReducer from "./features/users/userSlice";
import bookingsReducer from "./features/bookings/bookingsSlice";
export const store = configureStore({
  reducer: {
    divingCentersState: divingCentersReducer,
    userState: userReducer,
    equipmentsState: equipmentsReducer,
    bookingsState: bookingsReducer,
  },
});
