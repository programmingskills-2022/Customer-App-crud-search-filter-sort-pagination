"use client";
import { CustomerContext } from "@/context/CustomerContext";
import "./globals.css";
import { Roboto_Mono, Roboto } from "next/font/google";
import { useContext } from "react";
import ReduxProvider from "@/redux/Provider";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pageTitle } = useContext(CustomerContext);
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${roboto_mono.variable} box-border`}
    >
      <head>
        <title>SimuData App</title>
      </head>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
