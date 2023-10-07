import { Button } from "@tremor/react";
import ListTable from "../components/ListTable";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/20/solid";


const cols = [
  "Nume",
  "An",
  "Semestru",
  "Specializare"
];

const getItems = async () => {
  await new Promise(r => setTimeout(r, 2000));
  return [
    {
      data: ["Autocad", "1", "2", "CTI"],
      actions: [ { name: "Delete", icon: <TrashIcon></TrashIcon>, href: "#" } ],
      href: "/admin/courses/edit/1"
    },
    {
      data: ["FRC", "2", "1", "CTI"],
      actions: [ { name: "Delete", icon: <TrashIcon></TrashIcon>, href: "#" } ],
      href: "/admin/courses/edit/2"
    }
  ];
}

export default function CourseDashboard() {
  return (
    <div className="px-6 py-4">
      <div className="flex justify-end my-3">
        <Link href="/admin/courses/create">
          <Button color="teal">Add course</Button>
        </Link>
      </div>
      <ListTable columns={cols} getItems={getItems}></ListTable>
    </div>
  );
}
