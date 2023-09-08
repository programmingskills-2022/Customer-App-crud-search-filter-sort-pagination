import customersReducer from "./customers";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: { customers: customersReducer } });

export default store;
