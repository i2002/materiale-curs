import { Metadata } from "next";
import AdminHeader from "@/components/admin/layout/AdminHeader";
import Sidebar from "@/components/admin/layout/Sidebar";


export const metadata: Metadata = {
  title: "Panou administrare | Materiale curs",
  description: "",
}


export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col items-stretch w-full max-h-screen overflow-auto">
        <AdminHeader />
        <div className="overflow-auto p-6 h-full flex flex-col justify-stretch items-stretch">
          {children}
        </div>
      </div>
    </div>
  );
}
