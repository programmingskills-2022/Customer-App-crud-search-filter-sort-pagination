import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { generateId } from "@/lib/getGeneralMath";

type Customers = {
  value: Customer[];
};

const initialCustomers: Customers = {
  value: [
    {
      id: 1,
      guid: "",
      customer: "",
      asset_type: "",
      serial_number: "",
      service_contract: false,
      warranty: false,
    },
  ],
};

const CUSTOMERS_URL = "https://api.jsonbin.io/v3/b/62b9da24192a674d291c921b";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    try {
      const res = await fetch(CUSTOMERS_URL);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      return data.record;
    } catch (err) {
      console.error("An error occurred:", err);
    }
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState: initialCustomers,
  reducers: {
    addCustomer: (state, action) => {
      const newCustomer = action.payload;
      const repeatedCustomer = state.value.find(
        (customer) =>
          customer.customer === newCustomer.customer &&
          customer.asset_type === newCustomer.asset_type &&
          customer.serial_number === newCustomer.serial_number
      );
      if (!repeatedCustomer) state.value.push(newCustomer);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      return { value: action.payload };
    });
  },
});

export const selectAllCustomers = (state: RootState) =>
  state.customers.value.map((customer: CustomerVisibleCols) => {
    return {
      id: customer.id,
      customer: customer.customer,
      asset_type: customer.asset_type,
      serial_number: customer.serial_number,
      service_contract: customer.service_contract,
      warranty: customer.warranty,
    };
  });

export const { addCustomer } = customersSlice.actions;

export default customersSlice.reducer;
