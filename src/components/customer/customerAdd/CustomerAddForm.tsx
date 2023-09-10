"use client";

import Card from "@/components/ui/Card";
import Form from "@/components/ui/Form";
import { generateId } from "@/lib/getGeneralMath";
import { addCustomer } from "@/redux/features/customers";
import { AppDispatch } from "@/redux/store";
import { useState, useEffect, FormEvent } from "react";
import { useDispatch } from "react-redux";

export default function CustomerAddForm({
  customers,
}: {
  customers: CustomerVisibleCols[];
}) {
  const [error, setError] = useState("");
  const [formFields, setFormFields] = useState<Fields>({
    id: 0,
    serial_number: "",
    asset_type: "",
    customer: "",
    service_contract: false,
    warranty: false,
  });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setFormFields({ ...formFields, id: generateId(customers) });
  }, [customers]);

  function resetFields(): void {
    setFormFields((prev) => {
      return {
        id: 0,
        serial_number: "",
        asset_type: "",
        customer: "",
        service_contract: false,
        warranty: false,
      };
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !formFields.customer ||
      !formFields.serial_number ||
      !formFields.asset_type
    ) {
      setError("Customer or SerialNumber or AssetType is empty");
      return;
    } else {
      setError("");
    }
    dispatch(addCustomer(formFields));
    resetFields();
  }
  return (
    <div className="w-full px-2 flex flex-col justify-center items-center">
      <Card classname="w-full md:w-1/2 bg-slate-400 p-4 md:mx-auto md:p-8 mt-4 rounded-xl">
        {error && <p className="text-red-700 pb-4">{error}</p>}
        <Form
          fields={formFields}
          setFields={setFormFields}
          buttonLabel="Add"
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
}
