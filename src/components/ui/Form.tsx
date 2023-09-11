import { ChangeEvent, FormEventHandler, FormEvent } from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Button from "./Button";
import { useRouter } from "next/navigation";

type Props = {
  fields: any;
  setFields: any;
  buttonLabel: string;
  isUpdate: boolean;
  resetFields: (e: FormEvent<Element>) => void;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
};

export default function Form({
  fields,
  setFields,
  buttonLabel,
  isUpdate,
  resetFields,
  onSubmit,
}: Props) {
  const router = useRouter();
  console.log(fields);

  function changeValue(e: ChangeEvent<HTMLInputElement>) {
    const inputName = e.target.name;
    const inputNameType = typeof fields[inputName];
    const inputValue = e.target.value;
    const inputCheckValue = e.target.checked;

    // Update the corresponding state based on the input name
    if (inputNameType === "string")
      setFields({ ...fields, [inputName]: inputValue });
    else if (inputNameType === "boolean") {
      setFields({ ...fields, [inputName]: inputCheckValue });
    }
  }

  const inputElements = Object.keys(fields).map((key, i) => {
    if (typeof fields[key] === "string")
      return (
        <Input
          key={i}
          classname={[
            "flex flex-col gap-2",
            "",
            "outline-none bg-slate-50 text-slate-700 px-4 py-2 w-full rounded-xl",
          ]}
          name={key}
          labelValue={key}
          value={fields[key] as string}
          changeValue={changeValue}
        />
      );
    else if (typeof fields[key] === "boolean")
      return (
        <Checkbox
          key={i}
          name={key}
          labelValue={key}
          checked={fields[key] as boolean}
          changeCheckedValue={changeValue}
        />
      );
  });

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
      {inputElements}
      <div className="flex flex-col md:flex-row md:justify-end gap-4">
        <Button
          classname="bg-slate-700 text-white px-4 py-2 rounded-xl md:w-32 hover:bg-slate-800"
          disabled={false}
          onClick={undefined}
        >
          {buttonLabel}
        </Button>
        <Button
          classname="bg-slate-200 text-slate-800 border border-slate-400 hover:border-slate-500 px-4 py-2 rounded-xl md:w-32"
          disabled={false}
          onClick={resetFields}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
