import Card from "@/components/ui/Card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center m-4 text-xl">
      <Card classname="flex flex-col items-center w-1/2 p-4 gap-8 text-xl bg-slate-200 rounded-xl">
        <p>Sorry, the requested page does not exist.</p>
        <Link
          href="/"
          className="bg-slate-800 text-white/80 px-4 py-2 rounded-xl"
        >
          Back to Home
        </Link>
      </Card>
    </div>
  );
}
