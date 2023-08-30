import { FaFilter } from "react-icons/fa";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";
import Button from "../ui/Button";

type Props = {
  customers: CustomerVisibleCols[];
  setFilterCustomers: Dispatch<SetStateAction<CustomerVisibleCols[]>>;
};
export default function CustomersOptionSelect({
  customers,
  setFilterCustomers,
}: Props) {
  const [serialNumber, setSerialNumber] = useState<string>("");
  const [assetType, setAssetType] = useState<string>("");
  const [customer, setCustomer] = useState<string>("");
  const [warranty, setWarranty] = useState<boolean>(false);
  const [serviveContract, setServiveContract] = useState<boolean>(false);

  function resetFilters() {
    setSerialNumber("");
    setAssetType("");
    setCustomer("");
    setWarranty(false);
    setServiveContract(false);
    setFilterCustomers(customers);
  }

  //this function is for handling changes of textbox and checkbox inputs
  function changeValue(e: ChangeEvent<HTMLInputElement>) {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const inputCheckValue = e.target.checked;

    // Update the corresponding state based on the input name
    if (inputName === "serial_number") {
      setSerialNumber((prev) => inputValue);
    } else if (inputName === "asset_type") {
      setAssetType((prev) => inputValue);
    } else if (inputName === "customer") {
      setCustomer((prev) => inputValue);
    } else if (inputName === "warranty") {
      setWarranty((prev) => !prev);
    } else if (inputName === "service_contract") {
      setServiveContract((prev) => !prev);
    }

    const filteredCustomers = customers.filter((c) => {
      let serialNumberMatch: boolean;
      let assetTypeMatch: boolean;
      let customerMatch: boolean;
      let warrantyMatch: boolean;
      let serviceContractMatch: boolean;

      if (inputName === "serial_number") {
        serialNumberMatch = c.serial_number
          .toLowerCase()
          .includes(inputValue.toLowerCase());
      } else {
        serialNumberMatch = c.serial_number
          .toLowerCase()
          .includes(serialNumber.toLowerCase());
      }
      if (inputName === "customer") {
        customerMatch = c.customer
          .toLowerCase()
          .includes(inputValue.toLowerCase());
      } else {
        customerMatch = c.customer
          .toLowerCase()
          .includes(customer.toLowerCase());
      }
      if (inputName === "asset_type") {
        assetTypeMatch = c.asset_type
          .toLowerCase()
          .includes(inputValue.toLowerCase());
      } else {
        assetTypeMatch = c.asset_type
          .toLowerCase()
          .includes(assetType.toLowerCase());
      }
      if (inputName === "warranty") {
        warrantyMatch = c.warranty === inputCheckValue;
      } else {
        warrantyMatch = c.warranty === warranty;
      }
      if (inputName === "service_contract") {
        serviceContractMatch = c.service_contract === inputCheckValue;
      } else {
        serviceContractMatch = c.service_contract === serviveContract;
      }

      return (
        serialNumberMatch &&
        assetTypeMatch &&
        customerMatch &&
        warrantyMatch &&
        serviceContractMatch
      );
    });

    setFilterCustomers((prev) => filteredCustomers);
  }

  return (
    <div className="w-full flex items-center flex-col lg:flex-row lg:justify-between ">
      <div className="w-full flex gap-4 md:gap-6 flex-col md:flex-row px-2 md:px-4">
        <Input
          classname="outline-none bg-slate-200 text-slate-700 px-4 py-2 md:w-48 w-full rounded-xl"
          name="serial_number"
          labelValue="Serial Number"
          value={serialNumber}
          changeValue={changeValue}
        />
        <Input
          classname="outline-none bg-slate-200 text-slate-700 px-4 py-2 md:w-48 w-full rounded-xl"
          name="customer"
          labelValue="Customer"
          value={customer}
          changeValue={changeValue}
        />
        <Input
          classname="outline-none bg-slate-200 text-slate-700 px-4 py-2 md:w-48 w-full rounded-xl"
          name="asset_type"
          labelValue="Asset Type"
          value={assetType}
          changeValue={changeValue}
        />
      </div>
      <div className="w-full flex gap-8 md:gap-4 px-2 justify-center md:justify-start py-4 md:px-4">
        <Checkbox
          name="warranty"
          labelValue="Warranty"
          checked={warranty}
          changeCheckedValue={changeValue}
        />
        <Checkbox
          name="service_contract"
          labelValue="Service Contract"
          checked={serviveContract}
          changeCheckedValue={changeValue}
        />
      </div>
      <div className="w-full flex flex-col px-2 md:px-4 md:w-36 items-end">
        <Button
          classname="w-full py-2 px-4 bg-slate-700 opacity-90 text-white rounded-xl my-6 md:w-36 hover:opacity-95"
          onClick={resetFilters}
          disabled={false}
        >
          <span className="flex justify-center items-center">
            <p>Reset Filters</p> <FaFilter />
          </span>
        </Button>
      </div>
    </div>
  );
}
