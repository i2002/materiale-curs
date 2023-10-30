import { Card } from "@tremor/react";
import { notFound } from "next/navigation";
import CourseDeleteForm from "@/components/admin/forms/CourseDeleteForm";
import { getCourseById } from "@/lib/controllers/courseController";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params } : Props) {
  let courseId = parseInt(params.id);
  let course = !isNaN(courseId) ? await getCourseById(courseId) : null;
  if (course == null) {
    notFound();
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CourseDeleteForm course={course}></CourseDeleteForm>
    </Card>
  );
}
