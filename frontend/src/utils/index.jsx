import axios from "axios";
import { clearStore } from "../features/users/userSlice";
import { getUserFromLocalStorage } from "./localStorage";

import { removeUserFromLocalStorage } from "./localStorage";
import { API_URL } from "./constants";
export const customFetch = axios.create({
  // baseURL: API_URL,

  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export const api = "";
// customFetch.interceptors.request.use((config) => {
//   const user = getUserFromLocalStorage();
//   if (user) {
//     config.headers["Authorization"] = `Bearer ${user.token}`;
//   }
//   return config;
// });

customFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401)
    ) {
      removeUserFromLocalStorage();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// customFetch.interceptors.request.use((config) => {
//   const user = getUserFromLocalStorage();
//   if (user) {
//     config.headers["Authorization"] = `Bearer ${user.token}`;
//   }
//   return config;
// });

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};
export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return dollarsAmount;
};

export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}
