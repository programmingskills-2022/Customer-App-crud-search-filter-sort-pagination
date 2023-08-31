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
  type Options = {
    id: number;
    serial_number: string;
    asset_type: string;
    customer: string;
    service_contract: boolean;
    warranty: boolean;
  };
  const [options, setOptions] = useState<Options>({
    id: 1,
    serial_number: "",
    asset_type: "",
    customer: "",
    service_contract: false,
    warranty: false,
  });

  function resetFilters() {
    setOptions({
      ...options,
      serial_number: "",
      asset_type: "",
      customer: "",
      warranty: false,
      service_contract: false,
    });
    setFilterCustomers(customers);
  }

  //this function is for handling changes of textbox and checkbox inputs
  function changeValue(e: ChangeEvent<HTMLInputElement>) {
    const inputName = e.target.name;
    const inputNameType = typeof options[inputName as keyof typeof options];
    const inputValue = e.target.value;
    const inputCheckValue = e.target.checked;

    // Update the corresponding state based on the input name
    if (inputNameType === "string")
      setOptions({ ...options, [inputName]: inputValue });
    else if (inputNameType === "boolean") {
      setOptions({ ...options, [inputName]: inputCheckValue });
    }

    const filteredCustomers = customers.filter((c) => {
      // let serialNumberMatch: boolean;
      // let assetTypeMatch: boolean;
      // let customerMatch: boolean;
      // let warrantyMatch: boolean;
      // let serviceContractMatch: boolean;
      //match is an array of booleans for each input elements
      let match: boolean[] = [true];

      let index = 0;

      for (let key of Object.keys(c)) {
        const keyValue = c[key as keyof typeof c];

        //debugger;
        if (typeof keyValue === "string") {
          match[index] = keyValue
            .toString()
            .toLowerCase()
            .includes(
              inputName === key
                ? inputValue.toLowerCase()
                : options[key as keyof typeof options].toString().toLowerCase()
            );
          console.log(index, keyValue, inputName, key, match[index]);
        } else if (typeof c[key as keyof typeof c] === "boolean") {
          match[index] =
            inputName === key
              ? c[key as keyof typeof c] === inputCheckValue
              : c[key as keyof typeof c] ===
                (options[key as keyof typeof options] as boolean);

          console.log(index, keyValue, inputName, key, match[index]);
        } else match[index] = true;
        index++;
      }

      console.log(c.customer, match);
      return match.every((value) => value === true);
    });

    setFilterCustomers((prev) => filteredCustomers);
  }

  const optionInputElements = Object.keys(options).map((key, i) => {
    if (typeof options[key as keyof typeof options] === "string") {
      return (
        <Input
          key={i}
          classname="outline-none bg-slate-200 text-slate-700 px-4 py-2 md:w-48 w-full rounded-xl"
          name={key}
          labelValue={key}
          value={options[key as keyof typeof options] as string}
          changeValue={changeValue}
        />
      );
    }
    if (typeof options[key as keyof typeof options] === "boolean") {
      return (
        <Checkbox
          key={i}
          name={key}
          labelValue={key}
          checked={options[key as keyof typeof options] as boolean}
          changeCheckedValue={changeValue}
        />
      );
    }
  });

  return (
    <div className="w-full flex items-center flex-col lg:flex-row lg:justify-between ">
      <div className="w-full flex gap-4 md:gap-6 flex-col md:flex-row px-2 md:px-4">
        {optionInputElements}
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
