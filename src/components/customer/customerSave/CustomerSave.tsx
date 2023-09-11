"use client";

import { useEffect, useState } from "react";
import CustomerList from "../customerList/CustomerList";
import CustomerSaveForm from "./CustomerSaveForm";
import {
  deleteCustomerData,
  fetchCustomers,
  selectAllCustomers,
  selectCustomerById,
  updateCurrentCustomerId,
} from "@/redux/features/customers";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

export default function CustomerSave() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [customer, setCustomer] = useState<CustomerVisibleCols>({
    id: 0,
    serial_number: "",
    asset_type: "",
    customer: "",
    service_contract: false,
    warranty: false,
  });
  const customers = useAppSelector(selectAllCustomers);
  const dispatch = useAppDispatch();
  const currentCustomerId = useAppSelector(
    (state) => state.persistedReducer.customers.currentCustomerId
  );
  const updateCustomer = useAppSelector((state) =>
    selectCustomerById(currentCustomerId, state)
  ) as CustomerVisibleCols;

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  const handleUpdate = (id: number) => {
    dispatch(updateCurrentCustomerId(id));
    setIsUpdate((prev) => true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteCustomerData(id));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <CustomerSaveForm
        customers={customers}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        updateCustomer={isUpdate ? updateCustomer : customer}
      />
      <CustomerList
        customers={customers}
        hasOptions={false}
        hasDeleteButton={true}
        hasUpdateButton={true}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
}
