import { Title } from "@tremor/react";
import { CourseForm } from "@/components/admin/forms/CourseForm";

export default function Page() {
  return (
    <>
      <Title className="mb-3">Adăugare curs</Title>
      <CourseForm course={undefined}></CourseForm>
    </>
  );
}
