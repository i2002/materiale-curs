import { Title } from "@tremor/react";
import { StudentListForm } from "@/components/admin/forms/StudentListForm";

export default function Page() {
  return (
    <div className="p-6">
      <Title className="mb-3">Adăugare listă studenți</Title>
      <StudentListForm list={undefined}></StudentListForm>
    </div>
  );
}
