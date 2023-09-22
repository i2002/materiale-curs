import { Card, Text, Title } from "@tremor/react";
import Link from "next/link";

interface CourseCardProps {
  course: {
    name: string,
    description: string,
    href: string
  }
}

export default function CourseCard({ course } : CourseCardProps) {
  return (
    <Link href={course.href}>
      <Card className="dark:hover:bg-slate-800 hover:bg-slate-50 active:bg-slate-100">
        <Title>{course.name}</Title>
        <Text>{course.description}</Text>
      </Card>
    </Link>
  );
}
