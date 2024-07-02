import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  getThemeFromLocalStorage,
} from "../../utils/localStorage";
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
  clearStoreThunk,
  logoutUserThunk,
  showMeUserThunk,
} from "./userThunk";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/user/register", user, thunkAPI);
  }
);
export const clearStore = createAsyncThunk(
  "user/clearStore",
  async (user, thunkAPI) => {
    return clearStoreThunk(thunkAPI);
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/user/login", user, thunkAPI);
  }
);
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (user, thunkAPI) => {
    return logoutUserThunk("/user/logout", user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    return updateUserThunk("/user/updateUser", user, thunkAPI);
  }
);
export const showMe = createAsyncThunk(
  "user/showMe",
  async (user, thunkAPI) => {
    return showMeUserThunk("/users/showMe", user, thunkAPI);
  }
);

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserValues: (state) => {
      console.log("l");
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      console.log("Logged Out!");
    },
    toggleTheme: (state) => {},
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        alert("vous êtes inscrit!");
        console.log(payload);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        alert("l'email est déjà utilisé");
        console.log(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const user = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        alert(`bienvenue ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        alert("email ou mot de passe incorrect");
        console.log(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        console.log(`User Updated!`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
      })
      .addCase(clearStore.rejected, () => {
        console.log("There was an error..");
      })
      .addCase(showMe.fulfilled, (state, { payload: user }) => {
        addUserToLocalStorage(user);
        state.user = user;
        state.isLoggedIn = true;
        state.isLoginPageOpened = false;
      });
  },
});
export const { toggleSidebar, toggleTheme, clearUserValues } =
  userSlice.actions;
export default userSlice.reducer;
