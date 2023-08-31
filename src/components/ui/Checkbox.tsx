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
  const handleSpanClick = () => {
    if (changeCheckedValue) {
      // Invoke the changeCheckedValue event handler
      changeCheckedValue({
        target: { name, checked: !checked },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={labelValue}>{labelValue}</label>
      <div className={`flex items-center`}>
        <input
          id={labelValue}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={changeCheckedValue}
          className={`hover:cursor-pointer appearance-none w-12 h-6 rounded-xl ${
            checked ? "bg-slate-500" : "bg-slate-200"
          }`}
        />
        <span
          className={`hover:cursor-pointer relative top-0 right-12 w-4 h-4 appearance-none rounded-full ease-in-out duration-500 ${
            !checked
              ? "bg-slate-500 translate-x-1 "
              : "bg-slate-100 translate-x-7 "
          }`}
          onClick={handleSpanClick}
        ></span>
      </div>
    </div>
  );
}
