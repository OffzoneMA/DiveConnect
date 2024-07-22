import { customFetch, api } from "../../utils/index";
// import { clearFilters } from "./EquipmentsSlice";
import axios from "axios";
export const getAllBookingsOfUserThunk = async (_, thunkAPI) => {
  let url = api + "/bookings/user";
  try {
    const { data } = await customFetch.get(url);
    console.log("data", data);
    // const { data } = await axios.get(url);
    // thunkAPI.dispatch(clearFilters());
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
