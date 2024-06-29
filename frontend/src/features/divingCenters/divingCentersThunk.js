import { customFetch } from "../../utils/index";
// import { clearFilters } from "./divingCentersSlice";
import axios from "axios";
export const getAllDivingCentersThunk = async (_, thunkAPI) => {
  console.log("inside thunk");
  let url = "/api/diving-centers";
  const urlParams = new URLSearchParams(window.location.search);
  const search = urlParams.get("city");
  if (search) {
    url += `?city=${search}`;
  } else {
    url += "?city=";
  }
  // getting page from the url
  const page = urlParams.customFetch("page");
  if (page) {
    url += `&page=${page}`;
  } else {
    url += "&page=1";
  }
  try {
    const { data } = await axios.get(url);
    // thunkAPI.dispatch(clearFilters());
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
