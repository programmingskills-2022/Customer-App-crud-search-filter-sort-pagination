import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Mono, Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: "400",
});
const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Customer App",
  description: "This is a customer report app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${roboto_mono.variable} box-border`}
    >
      <body>{children}</body>
    </html>
  );
}
