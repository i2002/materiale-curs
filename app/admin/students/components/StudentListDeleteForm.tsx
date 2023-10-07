"use client";

import { deleteStudentListAction } from "@/app/_lib/forms/actions";
import { StudentList } from "@prisma/client";
import { Button, Text, Title } from "@tremor/react";
import { useRouter } from "next/navigation";

interface Props {
  list: StudentList;
}

export default function StudentListDeleteForm({ list }: Props) {
  const router = useRouter();
  const deleteHandler = async () => {
    await deleteStudentListAction(list.id);
    router.back();
  }

  return (
    <>
      <Title className="text-center">Confirmare ștergere</Title>
      <Text className="mt-1">Sigur doriți ștergerea listei de studenți: {list.name}?</Text>
      <div className="flex justify-between mt-4">
        <Button size="xs" color="teal" onClick={() => router.back()}>Anulare</Button>
        <Button size="xs" color="red" onClick={deleteHandler}>Șterge listă</Button>
      </div>
    </>
  );
}