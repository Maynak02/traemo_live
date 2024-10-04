import { createSlice } from "@reduxjs/toolkit";

import {
  loginAction,
  authLinkAction,
  authTokenAction,
  logoutAction,
  logoutAllAction,
  getUserAction,
  createUserAction,
  updateUserAction,
} from "./action";

const initialState = {
  isLoading: false,
  isForgotPassword: false,
  isRestPassword: false,
  isEmailData: "",
  userData: [],
  messageToken: "",
  isLoggedIn: false,
};

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    resetToInitialState(state) {
      return initialState;
    },
    userToken: (state, { payload }) => {
      state.messageToken = payload;
    },
    userData: (state, { payload }) => {
      state.userData = payload;
    },
    setIsForgotPassword: (state, { payload }) => {
      state.isForgotPassword = payload;
    },
    setIsOtp: (state, { payload }) => {
      state.isOtp = payload.isOtp;
      state.isEmailData = payload.email;
    },
    setIsRestPassword: (state, { payload }) => {
      state.isRestPassword = payload.isResetPassword;
      state.isEmailData = payload.email;
    },
    setIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(authTokenAction.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authTokenAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(authTokenAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(authLinkAction.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authLinkAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(authLinkAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(logoutAction.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(logoutAllAction.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutAllAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutAllAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getUserAction.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(createUserAction.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUserAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createUserAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(updateUserAction.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUserAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const authApiSliceReducer = AuthSlice.reducer;

export const {
  userStore,
  resetToInitialState,
  setIsForgotPassword,
  setIsRestPassword,
  setIsLoggedIn,
} = AuthSlice.actions;
