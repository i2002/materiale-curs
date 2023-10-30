import { Title } from "@tremor/react";
import { StudentListForm } from "@/components/admin/forms/StudentListForm";

export default function Page() {
  return (
    <>
      <Title className="mb-3">Adăugare listă studenți</Title>
      <StudentListForm list={undefined}></StudentListForm>
    </>
  );
}
