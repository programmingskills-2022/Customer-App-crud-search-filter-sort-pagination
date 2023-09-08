import { ChangeEventHandler } from "react";

type Props = {
  labelClassname: string;
  inputClassname: string;
  name: string;
  labelValue: string;
  value: string;
  changeValue: ChangeEventHandler<HTMLInputElement> | undefined;
};
export default function Input({
  labelClassname,
  inputClassname,
  name, //input name
  labelValue,
  value, //default input value
  changeValue, //change value function
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className={labelClassname} htmlFor={labelValue}>
        {labelValue}
      </label>
      <input
        name={name}
        id={labelValue}
        value={value}
        onChange={changeValue}
        className={inputClassname}
      />
    </div>
  );
}
