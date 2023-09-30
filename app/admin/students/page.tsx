import { getStudentLists } from "@/app/_lib/studentListController";
import { Button } from "@tremor/react";
import Link from "next/link";
import ListTable from "../components/ListTable";

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
    actions: [],
    href: ""
  }));
}

export default function StudentsDashboard() {
  return (
    <div className="px-6 py-4">
      <div className="flex justify-end my-3">
        <Link href="/admin/courses/create">
          <Button color="teal">Listă studenți nouă</Button>
        </Link>
      </div>
      <ListTable columns={cols} getItems={getItems}></ListTable>
    </div>
  );
}
