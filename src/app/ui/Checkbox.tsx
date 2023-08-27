import { ChangeEventHandler } from "react";

type Props = {
  name: string;
  labelValue: string;
  checked: boolean;
  changeCheckedValue: ChangeEventHandler<HTMLInputElement> | undefined;
};

export default function Checkbox({
  name,
  labelValue,
  checked,
  changeCheckedValue,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={labelValue}>{labelValue}</label>
      <div
        className={`w-12 h-6 rounded-xl flex items-center ${
          checked ? "bg-slate-500" : "bg-slate-200"
        } border border-slate-500`}
      >
        <input
          id={labelValue}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={changeCheckedValue}
          className={`hover:cursor-pointer appearance-none w-4 h-4 rounded-full ease-in-out duration-500 ${
            !checked
              ? "bg-slate-500 translate-x-1 "
              : "bg-slate-100 translate-x-7 "
          }`}
        />
      </div>
    </div>
  );
}
