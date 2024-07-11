import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllEquipmentsThunk } from "./equipmentsThunk";

const initialState = {
  isLoading: false,
  equipments: [],
  selectedEquipments: null,
};

export const getAllEquipments = createAsyncThunk(
  "/equipments",
  getAllEquipmentsThunk
);

const equipmentsSlice = createSlice({
  name: "equipments",
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
    [getAllEquipments.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllEquipments.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.equipments = payload;
    },
    [getAllEquipments.rejected]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
    },
  },
});
export const { handleChange } = equipmentsSlice.actions;
export default equipmentsSlice.reducer;
