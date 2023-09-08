import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  classname: string;
};
export default function Card({ children, classname }: Props) {
  return <div className={classname}>{children}</div>;
}
