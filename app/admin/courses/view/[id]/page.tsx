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
      <Card className="mt-4 max-w-lg mx-auto">
        <Title>{course.name}</Title>
        <List>
          <ListItem>
            <span>An</span>
            <span>{course.year}</span>
          </ListItem>
          <ListItem>
            <span>Semestru</span>
            <span>{course.semester}</span>
          </ListItem>
          <ListItem>
            <span>Specializare</span>
            <span>{course.specialization}</span>
          </ListItem>
        </List>
        <LinkButton href={`/admin/courses/edit/${course.id}`}>Modifică informații</LinkButton>
      </Card>
    </div>
  );
}
