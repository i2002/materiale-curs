import LinkButton from "@/components/ui/LinkButton";
import { getCourseById } from "@/lib/controllers/courseController";
import { Card, List, ListItem, Title } from "@tremor/react";
import { notFound } from "next/navigation";

type Props = {
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
    <div className="p-6">
      <h2 className="text-2xl">{course.name}</h2>
      <p className="text-sm text-gray-600 mt-1">
        Anul {course.year}, Semestrul {course.semester}, Specializarea {course.specialization}
      </p>
      <LinkButton href={`/admin/courses/edit/${course.id}`}>Modifică detalii</LinkButton>
    </div>
  );
}
