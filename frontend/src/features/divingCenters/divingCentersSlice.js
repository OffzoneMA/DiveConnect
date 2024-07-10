import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllDivingCentersThunk } from "./divingCentersThunk";

const initialFilters = {
  search: "",
  sort: "a-z",
};
const initialState = {
  isLoading: false,
  citiesOption: [],
  sortOptions: ["a-z", "z-a", "latest", "oldest"],
  numOfPages: 1,
  totalDivingCenters: 0,
  divingCenters: [],
  selectedCenters: null,
  ...initialFilters,
};

export const getAllDivingCenters = createAsyncThunk(
  "/diving-centers",
  getAllDivingCentersThunk
);

const divingCentersSlice = createSlice({
  name: "divingCenters",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value, changeProduct } }) => {
      if (!changeProduct) {
        // in case the field is an array
        if (Array.isArray(state[name])) {
          state[name] = [...value];
        } else {
          state[name] = value;
        }
      } else {
        state.singleProduct[name] = value;
      }
    },
    clearFilters: (state) => {
      return {
        ...state,
        ...initialFilters,
      };
    },
  },
  extraReducers: {
    [getAllDivingCenters.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllDivingCenters.fulfilled]: (state, { payload }) => {
      state.isLoading = false;

      let newDivingCenters = [...payload.divingCenters];
      newDivingCenters = newDivingCenters.map((center) => {
        return { ...center, selected: false };
      });
      state.divingCenters = newDivingCenters;

      state.numOfPages = payload.numOfPages;
      state.totalDivingCenters = payload.totalDivingCenters;
      state.page = payload.page;
    },
    [getAllDivingCenters.rejected]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
    },
  },
});
export const { handleChange } = divingCentersSlice.actions;
export default divingCentersSlice.reducer;
