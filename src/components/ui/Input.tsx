import { ChangeEventHandler } from "react";

type Props = {
  classname: string;
  name: string;
  labelValue: string;
  value: string;
  changeValue: ChangeEventHandler<HTMLInputElement> | undefined;
};
export default function Input({
  classname,
  name,
  labelValue,
  value,
  changeValue,
}: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={labelValue}>{labelValue}</label>
      <input
        name={name}
        id={labelValue}
        value={value}
        onChange={changeValue}
        className={classname}
      />
    </div>
  );
}
