import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { saveData } from "@/utils/storage";
import {
  AuthLink,
  AuthToken,
  CreateUser,
  GetUser,
  LoginUser,
  Logout,
  LogoutAll,
  UpdateUser,
} from "./services";

export const loginAction = createAsyncThunk(
  "authSlice/loginAction",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("🚀 ~ payload:", payload);
      const { data, status, message } = await LoginUser(payload);
      return { data, status, message };
    } catch (err) {
      console.log("🚀 ~ err:--->>>", err);
      toast.error(data?.data?.message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.detail);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const authTokenAction = createAsyncThunk(
  "authSlice/authTokenAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data, status, message } = await AuthToken(payload);
      return { data, status, message };
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const authLinkAction = createAsyncThunk(
  "authSlice/authLinkAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data, status, message } = await AuthLink(payload);
      if (data?.access_token) {
        saveData("token", data);
      }
      return { data, status, message };
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "authSlice/logoutAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { status, message } = await Logout(payload);
      return { status, message };
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message);
      }
      return rejectWithValue(err.message);
    }
  }
);
export const logoutAllAction = createAsyncThunk(
  "authSlice/logoutAllAction",
  async ({ rejectWithValue }) => {
    try {
      const { data, status, message } = await LogoutAll();
      return { data, status, message };
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message);
      }
      return rejectWithValue(err.message);
    }
  }
);
export const getUserAction = createAsyncThunk(
  "user/getUserAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data, status, message } = await GetUser(payload);
      return { data, status, message };
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message);
      }
      return rejectWithValue(err.message);
    }
  }
);
export const createUserAction = createAsyncThunk(
  "user/createUserAction",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("payload", payload);

      const { data, status, message } = await CreateUser(
        JSON.stringify(payload)
      );

      return { data, status, message };
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message);
      }
      return rejectWithValue(err.message);
    }
  }
);
export const updateUserAction = createAsyncThunk(
  "user/updateUserAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data, status, message } = await UpdateUser(payload);
      return { data, status, message };
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message);
      }
      return rejectWithValue(err.message);
    }
  }
);
