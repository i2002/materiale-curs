import { getStudentList } from "@/app/_lib/studentListController";
import { Title } from "@tremor/react";
import { notFound } from "next/navigation";
import { StudentListForm } from "../../components/StudentListForm";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params }: Props) {
  let listId = parseInt(params.id);
  let list = !isNaN(listId) ? await getStudentList(listId) : null;
  if (list == null) {
    notFound();
  }

  return (
    <div className="p-6">
      <Title className="mb-3">Editare listă {list.name}</Title>
      <StudentListForm list={list}></StudentListForm>
    </div>
  );
}
