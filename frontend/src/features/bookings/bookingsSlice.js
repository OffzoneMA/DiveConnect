import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBookingsOfUserThunk } from "./bookingsThunk";

const initialState = {
  isLoading: false,
  bookings: [],
  selectedBookings: null,
};

export const getAllBookingsOfUser = createAsyncThunk(
  "/bookings/user",
  getAllBookingsOfUserThunk
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      // in case the field is an array
      if (Array.isArray(state[name])) {
        state[name] = [...value];
      } else {
        state[name] = value;
      }
    },
    clearFilters: (state) => {
      return {
        ...state,
      };
    },
  },
  extraReducers: {
    [getAllBookingsOfUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllBookingsOfUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.bookings = payload;
    },
    [getAllBookingsOfUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
    },
  },
});
export const { handleChange } = bookingsSlice.actions;
export default bookingsSlice.reducer;
