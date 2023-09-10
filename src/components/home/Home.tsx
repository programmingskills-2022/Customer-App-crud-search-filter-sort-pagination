"use client";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const username = useAppSelector((state) => state.auth.value.username);
  const isAuth = useAppSelector((state) => state.auth.value.isAuth);

  return (
    <div className="text-xl py-12 px-4 flex flex-col-reverse items-center md:flex-row gap-4 ">
      <div className="w-full flex flex-col">
        <p className="text-xl"> Dear {username ? username : "anonymous"}</p>
        <p className="">
          This is a website with fake data that simulates working with customer
          information. It provides a platform where users can interact with a
          fictional customer database. Within this simulated environment, users
          have the ability to <b>add</b> new customers,
          <b> update</b> their information, and <b>delete</b> customer records .
        </p>
        {!isAuth && <p className="text-2xl py-8">Login first and enjoy app!</p>}
        {isAuth && (
          <>
            <p className="py-8 text-2xl">Let&apos;s start</p>
            <div className="text-slate-700 px-4 flex flex-col">
              <Link href={"/customers-list"}>- Show Customers List</Link>
              <Link href={"/customer-add"}>- Add a New Customer</Link>
            </div>
          </>
        )}
      </div>
      <Image
        className="rounded-xl"
        alt="customer-cycle"
        src={"/images/customers_1200x375-1200x370.jpg"}
        width={400}
        height={400}
      />
    </div>
  );
}
