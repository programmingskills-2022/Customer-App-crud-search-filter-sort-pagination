"use client";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import CustomerList from "./CustomerList";
import Header from "@/components/general/Header";
import { useDispatch } from "react-redux";
import { fetchCustomers, selectAllCustomers } from "@/redux/features/customers";

type Props = {
  title: string;
};

export default function CustomerListDisplay({ title }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const customers = useAppSelector(selectAllCustomers);

  useEffect(() => {
    dispatch(fetchCustomers());
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
      <CustomerList customers={customers} hasOptions={true} />
    </>
  );
}
