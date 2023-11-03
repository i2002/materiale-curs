import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { pdfjsAssetsPath } from "@/lib/pdfjsConfig";
import SessionProvider from "@/components/contexts/SessionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Materiale curs",
  description: "",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-slate-200 dark:bg-gray-950">
      <head>
        <link rel="stylesheet" href={`${pdfjsAssetsPath}/pdf_viewer.css`} />
      </head>
      <body className={`${inter.className} flex min-h-screen flex-col items-stretch`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
