import { createSlice } from "@reduxjs/toolkit";

import {
    forgotPasswordAction,
    getCategoryListAction,
    GetHubListAction,
    getUserAction,
    loginAction,
    logoutAction,
    registerAction,
    resetPasswordAction,
} from "./action";

const initialState = {
    isLoading: false,
    isForgotPassword: false,
    isRestPassword: false,
    isEmailData: "",
    userData: {},
    isLoggedIn: false,
    hubData: [],
    categoryList: [],
    hubList: [],
    productDetail: {},
    categorySubCategory: {},
    date: "",
};

const AuthSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        resetToInitialState(state) {
            return initialState;
        },
        setUserData: (state, { payload }) => {
            state.userData = payload;
        },
        setProductDetails: (state, { payload }) => {
            state.productDetail = payload;
        },
        setCategorySubCategoryDetails: (state, { payload }) => {
            state.categorySubCategory = payload;
        },
        setHubData: (state, { payload }) => {
            state.hubData = payload;
        },
        setDate: (state, { payload }) => {
            state.date = payload;
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
        setRiderDetail: (state, { payload }) => {
            state.riderDetail = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(registerAction.pending, (state, { payload }) => {
            //   state.isLoading = true;
            //   state.error = null;
            // })
            // .addCase(registerAction.fulfilled, (state, { payload }) => {
            //   state.isLoading = false;
            //   state.error = null;
            // })
            // .addCase(registerAction.rejected, (state, { payload }) => {
            //   state.isLoading = false;
            //   state.error = payload;
            // })
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
            .addCase(getUserAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.userData = payload?.data || {};
                state.error = null;
            })
            .addCase(getUserAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(logoutAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.userData = {};
                state.error = null;
            })
            .addCase(logoutAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(getCategoryListAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCategoryListAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.categoryList = payload;
                state.error = null;
            })
            .addCase(getCategoryListAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(GetHubListAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(GetHubListAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.hubList = payload;
                state.error = null;
            })
            .addCase(GetHubListAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            });
        // .addCase(forgotPasswordAction.pending, (state, { payload }) => {
        //   state.isLoading = true;
        //   state.error = null;
        // })
        // .addCase(forgotPasswordAction.fulfilled, (state, { payload }) => {
        //   state.isLoading = false;
        //   state.error = null;
        // })
        // .addCase(forgotPasswordAction.rejected, (state, { payload }) => {
        //   state.isLoading = false;
        //   state.error = payload;
        // })
        // .addCase(resetPasswordAction.pending, (state, { payload }) => {
        //   state.isLoading = true;
        //   state.error = null;
        // })
        // .addCase(resetPasswordAction.fulfilled, (state, { payload }) => {
        //   state.isLoading = false;
        //   state.error = null;
        // })
        // .addCase(resetPasswordAction.rejected, (state, { payload }) => {
        //   state.isLoading = false;
        //   state.error = payload;
        // });
    },
});

export const authApiSliceReducer = AuthSlice.reducer;
export const authState = (state) => state.auth;
export const {
    setUserData,
    setHubData,
    resetToInitialState,
    setIsForgotPassword,
    setIsRestPassword,
    setIsLoggedIn,
    setProductDetails,
    setCategorySubCategoryDetails,
    setRiderDetail,
    setDate,
} = AuthSlice.actions;
