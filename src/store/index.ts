import { configureStore } from "@reduxjs/toolkit";
import personReducer from "./reducers/personReducer";

const store = configureStore({
  reducer: personReducer,
});

export default store;
