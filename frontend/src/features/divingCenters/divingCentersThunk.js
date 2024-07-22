import { customFetch, api } from "../../utils/index";
// import { clearFilters } from "./divingCentersSlice";
import axios from "axios";
export const getAllDivingCentersThunk = async (_, thunkAPI) => {
  console.log("inside thunk");
  let url = api + "/diving-centers";
  const urlParams = new URLSearchParams(window.location.search);
  const search = urlParams.get("city");
  if (search) {
    url += `?city=${search}`;
  } else {
    url += "?city=";
  }
  // getting page from the url
  const page = urlParams.get("page");
  console.log(url);
  if (page) {
    url += `&page=${page}`;
  } else {
    url += "&page=1";
  }
  try {
    const { data } = await customFetch.get(url);
    // const { data } = await axios.get(url);
    // thunkAPI.dispatch(clearFilters());
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const getAllDivingCentersOfUserThunk = async (_, thunkAPI) => {
  console.log("inside thunk");
  let url = api + "/diving-centers/user";
  const urlParams = new URLSearchParams(window.location.search);
  const search = urlParams.get("city");
  if (search) {
    url += `?city=${search}`;
  } else {
    url += "?city=";
  }
  // getting page from the url
  const page = urlParams.get("page");
  console.log(url);
  if (page) {
    url += `&page=${page}`;
  } else {
    url += "&page=1";
  }
  try {
    const { data } = await customFetch.get(url);
    // const { data } = await axios.get(url);
    // thunkAPI.dispatch(clearFilters());
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const createDivingCenterThunk = async (center, thunkAPI) => {
  const url = api + "/diving-centers";
  try {
    const { data } = await customFetch.post(url, { center });
    // const { data } = await axios.get(url);
    // thunkAPI.dispatch(clearFilters());
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const updateDivingCenterThunk = async (center, thunkAPI) => {
  const id = thunkAPI.getState().divingCentersState.selectedCenter._id;
  const url = api + "/diving-centers/" + id;
  try {
    const { data } = await customFetch.put(url, { center });
    // const { data } = await axios.get(url);
    // thunkAPI.dispatch(clearFilters());
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const deleteDivingCenterThunk = async (id, thunkAPI) => {
  const url = api + "/diving-centers/" + id;
  try {
    const { data } = await customFetch.delete(url);
    // const { data } = await axios.get(url);
    // thunkAPI.dispatch(clearFilters());
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
