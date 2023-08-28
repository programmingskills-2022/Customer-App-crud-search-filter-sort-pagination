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

  const customerColLabels: colLabel[] = [
    { colName: "id", label: "Id", isSorted: false, sortable: true },
    { colName: "customer", label: "Customer", isSorted: false, sortable: true },
    {
      colName: "assetType",
      label: "Asset Type",
      isSorted: false,
      sortable: false,
    },
    {
      colName: "serial_number",
      label: "Serial Number",
      isSorted: false,
      sortable: false,
    },
    {
      colName: "service-contract",
      label: "Service Contract",
      isSorted: false,
      sortable: false,
    },
    {
      colName: "warranty",
      label: "Warranty",
      isSorted: false,
      sortable: false,
    },
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
