import Link from "next/link";
import { FaAngleDoubleLeft } from "react-icons/fa";
import Login from "../customer/login/Login";

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
      <div className={classname}>
        <h1>{title}</h1>
        {isHome && <Login />}
      </div>
    </>
  );
}

Header.defaultProps = {
  title: "Simulated Customer Data Management Platform",
  classname: "",
  isHome: false,
};
