import customersReducer from "./features/customers";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/auth";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  customers: customersReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: { persistedReducer },
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
