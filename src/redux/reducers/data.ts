// redux/reducers/data.ts
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  DATA: null,
  loading: true,
  error: null,
};

export const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadDataRequest", (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("LoadDataSuccess", (state, action: any) => {
      state.loading = false;
      state.DATA = action.payload;
    })
    .addCase("LoadDataFail", (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
});
