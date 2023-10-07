import { getStudentLists } from "@/lib/controllers/studentListController";
// import { Button } from "@tremor/react";
import Link from "next/link";
import ListTable from "@/components/admin/dataView/ListTable";
import { TrashIcon } from "@heroicons/react/20/solid";

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
    <div className="px-6 py-4">
      <div className="flex justify-end my-3">
        <Link href="/admin/students/create" className="tremor-Button-root flex-shrink-0 inline-flex justify-center items-center group font-medium outline-none rounded-tremor-default shadow-tremor-input dark:shadow-dark-tremor-input border px-4 py-2 text-sm bg-teal-500 border-teal-500 text-white hover:bg-teal-600 hover:border-teal-700">
          Listă studenți nouă
        </Link>
        {/* <Button color="teal">Listă studenți nouă</Button> */}
      </div>
      <ListTable columns={cols} getItems={getItems}></ListTable>
    </div>
  );
}

export const revalidate = 0;
