"use client";

import Card from "@/components/ui/Card";
import Form from "@/components/ui/Form";
import { generateId } from "@/lib/general";
import {
  addCustomerData,
  updateCustomerData,
  deleteCustomerData,
} from "@/redux/features/customers";
import { useAppDispatch } from "@/redux/hook";
import {
  useState,
  useEffect,
  FormEvent,
  SetStateAction,
  Dispatch,
} from "react";

type Props = {
  customers: CustomerVisibleCols[];
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  updateCustomer: CustomerVisibleCols;
};

export default function CustomerSaveForm({
  customers,
  isUpdate,
  setIsUpdate,
  updateCustomer,
}: Props) {
  const [error, setError] = useState("");
  const [formFields, setFormFields] = useState<CustomerVisibleCols>({
    id: 0,
    serial_number: "",
    asset_type: "",
    customer: "",
    service_contract: false,
    warranty: false,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isUpdate) setFormFields({ ...formFields, id: generateId(customers) });
    else
      setFormFields({
        id: updateCustomer.id,
        serial_number: updateCustomer.serial_number,
        asset_type: updateCustomer.asset_type,
        customer: updateCustomer.customer,
        service_contract: updateCustomer.service_contract,
        warranty: updateCustomer.warranty,
      });
  }, [customers]);
  //reset all form fields
  function resetFields(e: FormEvent): void {
    e.preventDefault();
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
    setIsUpdate((prev) => false);
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
    if (isUpdate) dispatch(updateCustomerData(formFields));
    else dispatch(addCustomerData(formFields));
    resetFields(e);
  }

  console.log(formFields);
  return (
    <div className="w-full px-2 md:p-4 flex flex-col justify-center items-center">
      <Card classname="w-full bg-slate-300 p-4  md:mx-auto md:p-8 mt-4 rounded-xl">
        {error && <p className="text-red-700 pb-4">{error}</p>}
        <Form
          fields={formFields}
          setFields={setFormFields}
          buttonLabel={isUpdate ? "Save" : "Add"}
          isUpdate={isUpdate}
          resetFields={resetFields}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
}
