"use client";

import { useEffect, useContext } from "react";
import CustomerList from "../customerList/CustomerList";
import CustomerSaveForm from "./CustomerSaveForm";
import {
  deleteCustomerData,
  fetchCustomers,
  selectAllCustomers,
  updateCurrentCustomerId,
} from "@/redux/features/customers";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TableContext } from "@/context/TableContext";

export default function CustomerSave() {
  const {
    handleHasUpdateButton,
    handleHasDeleteButton,
    handleCrudStatus,
    handleActiveRecord,
  } = useContext(TableContext);

  const customers = useAppSelector(selectAllCustomers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCustomers());
    handleCrudStatus({ isAdd: true, isUpdate: false, isDelete: false });
    handleHasDeleteButton(true);
    handleHasUpdateButton(true);
  }, []);

  const handleUpdate = (id: number) => {
    dispatch(updateCurrentCustomerId(id));
    handleCrudStatus({ isAdd: false, isUpdate: true, isDelete: false });
  };

  const handleDelete = (id: number) => {
    dispatch(deleteCustomerData(id));
    handleCrudStatus({ isAdd: false, isUpdate: false, isDelete: false });
  };

  const handleDeleteConfirm = (id: number) => {
    handleCrudStatus({ isAdd: false, isUpdate: false, isDelete: true });
    handleActiveRecord(id);
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <CustomerSaveForm customers={customers} />
      <CustomerList
        customers={customers}
        hasOptions={false}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleDeleteConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
