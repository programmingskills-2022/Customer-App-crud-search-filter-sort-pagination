import Link from "next/link";
import { FaAngleDoubleLeft } from "react-icons/fa";

type Props = {
  title: string;
  classname: string;
  isHome: boolean;
};
export default function Header({ title, classname, isHome }: Props) {
  return (
    <>
      {!isHome && (
        <Link href={"/"}>
          <FaAngleDoubleLeft />
        </Link>
      )}
      <h1 className={classname}>{title}</h1>
    </>
  );
}

Header.defaultProps = {
  title: "Simulated Customer Data Management Platform",
  classname: "",
  isHome: false,
};
