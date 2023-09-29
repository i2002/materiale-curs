import AdminHeader from "./components/AdminHeader";
import Sidebar from "./components/Sidebar";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <div className="flex flex-col items-stretch w-full">
        <AdminHeader></AdminHeader>
        {children}
      </div>
    </div>
  );
}
