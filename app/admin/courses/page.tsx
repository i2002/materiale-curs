import { Button } from "@tremor/react";
import ListTable from "@/components/admin/dataView/ListTable";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/20/solid";
import { getCourses } from "@/lib/controllers/courseController";


const cols = [
  "Nume",
  "An",
  "Semestru",
  "Specializare"
];

const getItems = async () => {
  let courses = await getCourses();
  
  return courses.map(course => ({
    data: [
      course.name,
      String(course.year),
      String(course.semester),
      course.specialization
    ],
    actions: [{
      name: "Delete",
      icon: <TrashIcon></TrashIcon>,
      href: `/admin/courses/delete/${course.id}`
    }],
    href: `/admin/courses/view/${course.id}`
  }));
}

export default function CourseDashboard() {
  return (
    <div className="px-6 py-4">
      <div className="flex justify-end my-3">
        <Link href="/admin/courses/create">
          <Button color="teal">Curs nou</Button>
        </Link>
      </div>
      <ListTable columns={cols} getItems={getItems}></ListTable>
    </div>
  );
}
