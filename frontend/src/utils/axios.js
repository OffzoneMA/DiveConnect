// export const checkForUnauthenticatedError = async (error, thunkAPI) => {
//   const user = getUserFromLocalStorage();
//   if (error.response.status === 401) {
//     thunkAPI.dispatch(removeUser());
//     if (user?.role === "admin") {
//       thunkAPI.dispatch(displayError());
//       thunkAPI.dispatch(displayMsg("Unauthorized!!! logging Out"));
//     }
//   }
// };
