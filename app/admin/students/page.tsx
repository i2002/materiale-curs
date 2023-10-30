import { Button } from "@tremor/react";
import { TrashIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { getStudentLists } from "@/lib/controllers/studentListController";
import ListTable from "@/components/admin/dataView/ListTable";

const cols = [
  "Nume listă",
  "Număr studenți"
];

const getItems = async () => {
  let lists = await getStudentLists();

  return lists.map(list => ({
    data: [
      list.name,
      String(list._count.students)
    ],
    actions: [{
      name: "Delete",
      icon: <TrashIcon />,
      href: `/admin/students/delete/${list.id}`
    }],
    href: `/admin/students/edit/${list.id}`
  }));
}

export default function StudentsDashboard() {
  return (
    <>
      <div className="flex justify-end my-3">
        <Link href="/admin/students/create">
          <Button color="teal">Listă studenți nouă</Button>
        </Link>
      </div>
      <ListTable columns={cols} getItems={getItems}></ListTable>
    </>
  );
}

export const revalidate = 0;
