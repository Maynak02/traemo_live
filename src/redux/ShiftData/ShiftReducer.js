import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shiftObjData: {},
};

const ShiftReducer = createSlice({
    name: "ShiftReducer",
    initialState,
    reducers: {
        resetToInitialState(state) {
            return initialState;
        },
        setShiftObjData: (state, action) => {
            state.shiftObjData = action.payload;
        },
    },
});

export const { setShiftObjData, resetToInitialState } = ShiftReducer.actions;

export const shiftDataSliceReducer = ShiftReducer.reducer;
export const shiftDataState = (state) => state.shiftData;
