import { MouseEventHandler, ReactNode } from "react";

type Props = {
  children: ReactNode;
  classname: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

export default function Button({ children, classname, onClick }: Props) {
  return (
    <button className={classname} onClick={onClick}>
      {children}
    </button>
  );
}
