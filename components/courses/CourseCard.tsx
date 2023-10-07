import { Course } from "@prisma/client";
import { Card, Text, Title } from "@tremor/react";
import Link from "next/link";

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course } : CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <Card className="dark:hover:bg-slate-800 hover:bg-slate-50 active:bg-slate-100">
        <Title>{course.name}</Title>
        <Text>{`Anul ${course.year}, Semestrul ${course.semester}`}</Text>
      </Card>
    </Link>
  );
}
