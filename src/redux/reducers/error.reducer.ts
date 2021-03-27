import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";

interface IErrorState {
  error: string;
}

const errorSlice = createSlice({
  name: "error",
  initialState: {} as IErrorState,
  reducers: {
    setError(state: IErrorState, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const errorReducer = errorSlice.reducer;
export const { setError } = errorSlice.actions;

export const selectError = (state: AppState) => state.errorState.error;
