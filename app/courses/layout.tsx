import Header from "../_components/Header";

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
