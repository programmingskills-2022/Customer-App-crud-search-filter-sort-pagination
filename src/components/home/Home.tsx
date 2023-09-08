import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-xl py-12 px-4 flex flex-col-reverse items-center md:flex-row gap-4 ">
      <div className="w-full flex flex-col">
        <p className="">
          This is a website with fake data that simulates working with customer
          information. It provides a platform where users can interact with a
          fictional customer database. Within this simulated environment, users
          have the ability to <b>add</b> new customers,
          <b> update</b> their information, and <b>delete</b> customer records .
        </p>
        <p className="py-8 text-2xl">Let's start</p>
        <div className="text-slate-700 px-4 flex flex-col">
          <Link href={"/customers-list"}>- Show Customers List</Link>
          <Link href={"/customer-add"}>- Add a New Customer</Link>
        </div>
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
