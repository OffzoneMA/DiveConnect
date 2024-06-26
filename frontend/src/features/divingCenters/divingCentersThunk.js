import { customFetch } from "../../utils/index";
// import { clearFilters } from "./divingCentersSlice";
export const getAllDivingCentersThunk = async (_, thunkAPI) => {
  let url = "/diving-centers";
  const { search } = thunkAPI.getState().divingCentersState;
  console.log("url", search);
  if (search) {
    url += `?city=${search}`;
  }
  try {
    const { data } = await customFetch.get(url);
    // thunkAPI.dispatch(clearFilters());
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
