import { Metadata } from "next";
import getCustomerData from "@/lib/getCustomersData";
import Header from "@/components/general/Header";
import CustomerList from "@/components/customer/customerList/CustomerList";

export const metadata: Metadata = {
  title: "Customers List",
  description: "Customers List",
};

export default async function CustomerListPage() {
  const customersData: Promise<CustomersData> = await getCustomerData();

  const customers: Customer[] = (await customersData).record;

  const customersVisibleCols = customers.map((customer) => {
    const newCustomer: CustomerVisibleCols = {
      id: customer.id,
      customer: customer.customer,
      asset_type: customer.asset_type,
      serial_number: customer.serial_number,
      service_contract: customer.service_contract,
      warranty: customer.warranty,
    };

    return newCustomer;
  });

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
      <CustomerList customers={customersVisibleCols} />
    </>
  );
}
