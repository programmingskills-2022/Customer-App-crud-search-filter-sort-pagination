"use client";
import "./globals.css";
import { Roboto_Mono, Roboto } from "next/font/google";
import ReduxProvider from "@/redux/Provider";
import ContextProvider from "@/context/TableContext";

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
  return (
    <html
      lang="en"
      className={`w-full ${roboto.variable} ${roboto_mono.variable} box-border`}
    >
      <head>
        <title>SimuData App</title>
      </head>
      <body>
        <ContextProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </ContextProvider>
        <div id="overlay"></div>
      </body>
    </html>
  );
}
