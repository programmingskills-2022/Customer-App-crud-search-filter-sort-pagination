"use client";

import { useEffect } from "react";
import CustomerList from "../customerList/CustomerList";
import CustomerAddForm from "./CustomerAddForm";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { fetchCustomers, selectAllCustomers } from "@/redux/features/customers";
import { generateId } from "@/lib/getGeneralMath";

export default function CustomerAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const customers = useAppSelector(selectAllCustomers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);
  return (
    <div className="w-full flex flex-col gap-4">
      <CustomerAddForm customers={customers} />
      {/* {customers.map((customer) => (
        <p>{customer.customer}</p>
      ))} */}
      <CustomerList customers={customers} hasOptions={false} />
    </div>
  );
}
