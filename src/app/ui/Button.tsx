import { MouseEventHandler, ReactNode } from "react";

type Props = {
  children: ReactNode;
  disabled: boolean;
  classname: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

export default function Button({
  children,
  disabled,
  classname,
  onClick,
}: Props) {
  return (
    <button className={classname} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
