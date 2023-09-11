import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../hook";

type Customers = {
  value: Customer[];
  currentCustomerId: number;
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
  currentCustomerId: 1,
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
    addCustomerData: (state, action) => {
      const newCustomer = action.payload;
      const repeatedCustomer = state.value.find(
        (customer) =>
          customer.customer === newCustomer.customer &&
          customer.asset_type === newCustomer.asset_type &&
          customer.serial_number === newCustomer.serial_number
      );
      if (!repeatedCustomer) state.value.push(newCustomer);
    },
    updateCustomerData: (state, action) => {
      debugger;
      const updatedCustomer = action.payload;
      const updatedCustomerid = updatedCustomer.id;

      const updatedCustomers = [...state.value];
      const updateCustomerIndex = state.value.findIndex(
        (customer) => customer.id === updatedCustomerid
      );

      if (updateCustomerIndex !== -1)
        updatedCustomers[updateCustomerIndex] = updatedCustomer;

      return {
        value: updatedCustomers,
        currentCustomerId: updatedCustomerid,
      };
    },
    deleteCustomerData: (state, action) => {
      const deletedCustomerId = action.payload;
      const newCustomers: Customer[] = state.value.filter(
        (customer) => customer.id !== deletedCustomerId
      );
      return {
        value: [...newCustomers],
        currentCustomerId: 1,
      };
    },
    updateCurrentCustomerId: (state, action) => {
      return { ...state, currentCustomerId: action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      return { value: action.payload, currentCustomerId: 1 };
    });
  },
});

export const selectAllCustomers = (state: RootState) =>
  state.persistedReducer.customers.value.map(
    (customer: CustomerVisibleCols) => {
      return {
        id: customer?.id,
        customer: customer?.customer,
        asset_type: customer?.asset_type,
        serial_number: customer?.serial_number,
        service_contract: customer?.service_contract,
        warranty: customer?.warranty,
      };
    }
  );

export const selectCustomerById = (cusomerId: number, state: RootState) =>
  state.persistedReducer.customers.value.find(
    (customer) => customer?.id === cusomerId
  );

export const {
  addCustomerData,
  deleteCustomerData,
  updateCurrentCustomerId,
  updateCustomerData,
} = customersSlice.actions;

export default customersSlice.reducer;
