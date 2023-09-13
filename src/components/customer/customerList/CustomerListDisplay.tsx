"use client";

import { useContext, useEffect } from "react";
import CustomerList from "./CustomerList";
import Header from "@/components/general/Header";
import { fetchCustomers, selectAllCustomers } from "@/redux/features/customers";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TableContext } from "@/context/TableContext";

type Props = {
  title: string;
};

export default function CustomerListDisplay({ title }: Props) {
  const { handleHasUpdateButton, handleHasDeleteButton } =
    useContext(TableContext);
  const dispatch = useAppDispatch();
  const customers = useAppSelector(selectAllCustomers);

  useEffect(() => {
    dispatch(fetchCustomers());
    handleHasDeleteButton(false);
    handleHasUpdateButton(false);
  }, []);

  return (
    <>
      <div
        className={`flex items-center gap-4 w-full font-roboto_mono font-bold text-slate-700 md:text-2xl text-xl p-4 bg-slate-100`}
      >
        <Header
          title={title}
          classname={`md:text-4xl text-2xl`}
          isHome={false}
        />
      </div>
      <CustomerList
        customers={customers}
        hasOptions={true}
        handleUpdate={(id: number) => {}}
        handleDelete={(id: number) => {}}
        handleDeleteConfirm={(id) => {}}
      />
    </>
  );
}
