import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createDivingCenterThunk,
  deleteDivingCenterThunk,
  getAllDivingCentersOfUserThunk,
  getAllDivingCentersThunk,
  updateDivingCenterThunk,
} from "./divingCentersThunk";

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
  selectedCenter: null,
  changeCenter: false,
  ...initialFilters,
};

export const getAllDivingCenters = createAsyncThunk(
  "/diving-centers/list",
  getAllDivingCentersThunk
);
export const getAllDivingCentersOfUser = createAsyncThunk(
  "/diving-centers/user",
  getAllDivingCentersOfUserThunk
);
export const createDivingCenter = createAsyncThunk(
  "/diving-centers",
  createDivingCenterThunk
);
export const updateDivingCenter = createAsyncThunk(
  "/diving-centers",
  updateDivingCenterThunk
);
export const deleteDivingCenter = createAsyncThunk(
  "/diving-centers",
  deleteDivingCenterThunk
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
          console.log(state[name]);
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
    [getAllDivingCentersOfUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllDivingCentersOfUser.fulfilled]: (state, { payload }) => {
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
    [getAllDivingCentersOfUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
    },
    [createDivingCenter.pending]: (state) => {
      state.isLoading = true;
    },
    [createDivingCenter.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.image = null;
    },
    [createDivingCenter.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [updateDivingCenter.pending]: (state) => {
      state.isLoading = true;
    },
    [updateDivingCenter.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.image = null;
      state.selectedCenter = null;
    },
    [updateDivingCenter.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [deleteDivingCenter.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteDivingCenter.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [deleteDivingCenter.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
  },
});
export const { handleChange } = divingCentersSlice.actions;
export default divingCentersSlice.reducer;
