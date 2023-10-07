import { getStudentList } from "@/app/_lib/studentListController";
import { Card } from "@tremor/react";
import { notFound } from "next/navigation";
import StudentListDeleteForm from "../../components/StudentListDeleteForm";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params } : Props) {
  let listId = parseInt(params.id);
  let list = !isNaN(listId) ? await getStudentList(listId) : null;
  if (list == null) {
    notFound();
  }

  return (
    <Card className="mx-auto max-w-sm mt-6">
      <StudentListDeleteForm list={list}></StudentListDeleteForm>
    </Card>
  );
}
