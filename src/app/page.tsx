import Header from "@/components/general/Header";
import Home from "@/components/home/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SimuData App",
  description: "Simulated Customer Data Management Platform",
};
export default function Page() {
  return (
    <main className="w-full font-roboto flex-col justify-center ">
      <Header
        title={metadata.description as string}
        classname={`w-full flex items-center justify-between font-roboto_mono font-bold text-slate-700 text-2xl md:text-4xl p-4 bg-slate-100`}
        isHome={true}
      />

      <Home />
    </main>
  );
}
