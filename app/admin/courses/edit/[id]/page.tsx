import { CourseForm } from "@/components/admin/forms/CourseForm";
import { getCourseById } from "@/lib/controllers/courseController";
import { Title } from "@tremor/react";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params }: Props) {
  let courseId = parseInt(params.id);
  let course = !isNaN(courseId) ? await getCourseById(courseId) : null;
  if (course == null) {
    notFound();
  }

  return (
    <>
      <Title className="mb-3">Editare curs &quot;{course.name}&quot;</Title>
      <CourseForm course={course}></CourseForm>
    </>
  );
}
