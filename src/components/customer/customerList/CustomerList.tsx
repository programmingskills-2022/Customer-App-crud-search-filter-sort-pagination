import CustomersOptionSelect from "./CustomersOptionSelect";
import { useEffect, useState } from "react";
import ChangeBooleanStatus from "./CustomersStyles";
import Table from "@/components/ui/Table";

type Props = {
  customers: CustomerVisibleCols[];
  hasOptions: boolean;
  hasDeleteButton: boolean;
  hasUpdateButton: boolean;
  handleUpdate: (id: number) => void;
  handleDelete: (id: number) => void;
};
export default function CustomerList({
  customers,
  hasOptions,
  hasDeleteButton,
  hasUpdateButton,
  handleUpdate,
  handleDelete,
}: Props) {
  const [filterCustomers, setFilterCustomers] = useState<CustomerVisibleCols[]>(
    []
  );

  useEffect(() => {
    setFilterCustomers((prev) => customers);
  }, [customers]);

  const customerColLabels: colLabel[] = [
    {
      colName: "id",
      label: "Id",
      isSorted: false,
      sortable: true,
      widthcss: "w-10 md:w-20",
    },
    {
      colName: "customer",
      label: "Customer",
      isSorted: false,
      sortable: true,
      widthcss: "w-72",
    },
    {
      colName: "assetType",
      label: "Asset Type",
      isSorted: false,
      sortable: false,
      widthcss: "w-60",
    },
    {
      colName: "serial_number",
      label: "Serial Number",
      isSorted: false,
      sortable: false,
      widthcss: "w-80",
    },
    {
      colName: "service-contract",
      label: "Service Contract",
      isSorted: false,
      sortable: false,
      widthcss: "w-20 md:w-52",
    },
    {
      colName: "warranty",
      label: "Warranty",
      isSorted: false,
      sortable: false,
      widthcss: "w-20 md:w-52",
    },
  ];

  const calculatedFields: CalculatedField[] = [
    {
      fieldIndex: "service_contract",
      calcFunc: (value: boolean) => ChangeBooleanStatus(value),
    },
    {
      fieldIndex: "warranty",
      calcFunc: (value: boolean) => ChangeBooleanStatus(value),
    },
  ];

  return (
    <div className="w-full">
      {hasOptions && (
        <CustomersOptionSelect
          customers={customers}
          setFilterCustomers={setFilterCustomers}
        />
      )}
      <Table
        data={filterCustomers}
        keyField={"id"}
        colLabels={customerColLabels}
        summeryVisible={true}
        calculatedFields={calculatedFields}
        hasDeleteButton={hasDeleteButton}
        hasUpdateButton={hasUpdateButton}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
}
