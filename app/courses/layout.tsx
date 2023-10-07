import Header from "@/components/ui/AppHeader";

export default async function StudentDashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header title='Materiale curs'></Header>
      {children}
    </>
  );
}
