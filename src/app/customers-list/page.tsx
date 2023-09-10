import { Metadata } from "next";
import CustomerListDisplay from "@/components/customer/customerList/CustomerListDisplay";

export const metadata: Metadata = {
  title: "Customers List",
  description: "Customers List",
};

export default function CustomerListPage() {
  return <CustomerListDisplay title={metadata.description as string} />;
}
