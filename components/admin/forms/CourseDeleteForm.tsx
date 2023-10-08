"use client";

import { deleteCourseAction } from "@/lib/actions/courseActions";
import { Course } from "@prisma/client";
import { Button, Text, Title } from "@tremor/react";
import { useRouter } from "next/navigation";

interface Props {
  course: Course;
}

export default function StudentListDeleteForm({ course }: Props) {
  const router = useRouter();
  const deleteHandler = async () => {
    await deleteCourseAction(course.id);
    router.back();
  }

  return (
    <>
      <Title className="text-center">Confirmare ștergere</Title>
      <Text className="mt-1">Sigur doriți ștergerea cursului "{course.name}"?</Text>
      <Text>Toate resursele asociate vor fi șterse.</Text>
      <div className="flex justify-between mt-4">
        <Button size="xs" color="teal" onClick={() => router.back()}>Anulare</Button>
        <Button size="xs" color="red" onClick={deleteHandler}>Șterge curs</Button>
      </div>
    </>
  );
}
