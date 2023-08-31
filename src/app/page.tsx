import CustomerList from "@/components/customer/CustomerList";
import getCustomerData from "@/lib/getCustomersData";

export default async function Home() {
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
    <main className="w-full font-roboto flex-col justify-center items-left">
      <h1
        className={`w-full font-roboto_mono font-bold text-slate-700 text-2xl md:text-4xl p-4 bg-slate-100`}
      >
        Customer Lists
      </h1>
      <CustomerList customers={customersVisibleCols} />
    </main>
  );
}
