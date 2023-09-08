import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialCustomers: Customer[] = [];
const CUSTOMER_URL = "https://api.jsonbin.io/v3/b/62b9da24192a674d291c921b";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    try {
      const res = await fetch(CUSTOMER_URL);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("An error occurred:", err);
    }
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState: initialCustomers,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchCustomers.fulfilled,
      (state, action) => action.payload
    );
  },
});

export const customersSliceActions = customersSlice.actions;
export const selectAllCustomers = (state: { customers: Customer[] }) =>
  state.customers;

export default customersSlice.reducer;
