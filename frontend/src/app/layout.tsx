import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import { TanstackProvider } from "@/provider/TanstackProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista de Compras",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.className} lang="pt">
      <body>
          <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
