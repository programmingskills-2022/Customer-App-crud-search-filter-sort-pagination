"use client";

import CustomersOptionSelect from "./CustomersOptionSelect";
import getStatus from "@/lib/customersStyles";
import { useState } from "react";
import Table from "../ui/Table";

type Props = {
  customers: CustomerVisibleCols[];
};
export default function CustomerList({ customers }: Props) {
  const [filterCustomers, setFilterCustomers] = useState<CustomerVisibleCols[]>(
    [...customers]
  );

  const customerColLabels: string[] = [
    "Id",
    "Customer",
    "Asset Type",
    "Serial Number",
    "Service Contract",
    "Warranty",
  ];

  const calculatedFields: CalculatedField[] = [
    {
      fieldIndex: "service_contract",
      calcFunc: (value: boolean) => getStatus(value),
    },
    {
      fieldIndex: "warranty",
      calcFunc: (value: boolean) => getStatus(value),
    },
  ];

  return (
    <>
      <CustomersOptionSelect
        customers={customers}
        setFilterCustomers={setFilterCustomers}
      />
      <Table
        data={filterCustomers}
        colLabels={customerColLabels}
        summeryVisible={true}
        calculatedFields={calculatedFields}
      />
    </>
  );
}
