import { ChangeEventHandler } from "react";

type Props = {
  classname: string[];
  name: string;
  labelValue: string;
  value: string;
  changeValue: ChangeEventHandler<HTMLInputElement> | undefined;
};
export default function Input({
  classname,
  name, //input name
  labelValue,
  value, //default input value
  changeValue, //change value function
}: Props) {
  return (
    <div className={classname[0]}>
      <label className={classname[1]} htmlFor={labelValue}>
        {labelValue}
      </label>
      <input
        name={name}
        id={labelValue}
        value={value}
        onChange={changeValue}
        className={classname[2]}
      />
    </div>
  );
}
