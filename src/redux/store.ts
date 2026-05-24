import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "./reducers/data";


 

const Store = configureStore({
  reducer: {
    PortfolioData: dataReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
