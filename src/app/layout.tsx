import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Undian Doorprize - PT GWI",
  description: "Aplikasi undian doorprize SEMARAK KEMERDEKAAN 80 TH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-red-50`}>{children}</body>
    </html>
  );
}