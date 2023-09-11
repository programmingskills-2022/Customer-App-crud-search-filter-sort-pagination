import CustomerSave from "@/components/customer/customerSave/CustomerSave";
import Header from "@/components/general/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add customer",
  description: "Add New Customer",
};

export default function CustomerSavePage() {
  return (
    <>
      <div
        className={`flex items-center gap-4 w-full font-roboto_mono font-bold text-slate-700 md:text-2xl text-xl p-4 bg-slate-100`}
      >
        <Header
          title={metadata.description as string}
          classname={`md:text-4xl text-2xl`}
          isHome={false}
        />
      </div>
      <CustomerSave />
    </>
  );
}
