import Card from "@/components/ui/Card";
import Form from "@/components/ui/Form";
import { TableContext } from "@/context/TableContext";
import { generateId } from "@/lib/general";
import {
  addCustomerData,
  updateCustomerData,
  selectCustomerById,
} from "@/redux/features/customers";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useState, useEffect, FormEvent, useContext } from "react";

type Props = {
  customers: CustomerVisibleCols[];
};

export default function CustomerSaveForm({ customers }: Props) {
  const { crudStatus, handleCrudStatus } = useContext(TableContext);
  const [error, setError] = useState("");
  const [formFields, setFormFields] = useState<CustomerVisibleCols>({
    id: 0,
    serial_number: "",
    asset_type: "",
    customer: "",
    service_contract: false,
    warranty: false,
  });

  const currentCustomerId = useAppSelector(
    (state) => state.persistedReducer.customers.currentCustomerId
  );

  const updateCustomer = useAppSelector((state) =>
    selectCustomerById(currentCustomerId, state)
  ) as CustomerVisibleCols;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (crudStatus.isDelete)
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
    else if (crudStatus.isAdd)
      setFormFields({ ...formFields, id: generateId(customers) });
    else if (crudStatus.isUpdate) {
      setFormFields({
        id: updateCustomer.id,
        serial_number: updateCustomer.serial_number,
        asset_type: updateCustomer.asset_type,
        customer: updateCustomer.customer,
        service_contract: updateCustomer.service_contract,
        warranty: updateCustomer.warranty,
      });
    }
  }, [customers, crudStatus]);
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
    handleCrudStatus({ isAdd: false, isDelete: false, isUpdate: false });
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
    if (crudStatus.isUpdate) dispatch(updateCustomerData(formFields));
    else if (crudStatus.isAdd) dispatch(addCustomerData(formFields));
    resetFields(e);
  }

  return (
    <div className="w-full px-2 md:p-4 flex flex-col justify-center items-center">
      <Card classname="w-full bg-slate-300 p-4  md:mx-auto md:p-8 mt-4 rounded-xl">
        {error && <p className="text-red-700 pb-4">{error}</p>}
        <Form
          fields={formFields}
          setFields={setFormFields}
          buttonLabel={crudStatus.isUpdate ? "Save" : "Add"}
          resetFields={resetFields}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
}
