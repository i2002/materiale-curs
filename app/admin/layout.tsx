import AdminHeader from "@/components/admin/layout/AdminHeader";
import Sidebar from "@/components/admin/layout/Sidebar";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <div className="flex flex-col items-stretch w-full max-h-screen overflow-auto">
        <AdminHeader></AdminHeader>
        <div className="overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
