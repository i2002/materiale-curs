"use client"

import SelectStudentListDialog from "@/components/admin/forms/SelectStudentListDialog";
import { linkStudentListsAction, unlinkStudentListsAction } from "@/lib/actions/courseActions";
import { StudentListWithStudents } from "@/lib/controllers/studentListController";
import { PencilIcon, PlusIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Button, List, ListItem } from "@tremor/react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Props {
  courseId: number;
  initialData: Array<StudentListWithStudents>;
  lists: Array<StudentListWithStudents>
}

export default function CourseStudentListsForm({ courseId, initialData, lists }: Props) {
  // component state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [data, setData] = useState(initialData ?? []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // list manipulation handlers
  const studentListsHandler = async (lists: number[], action: boolean = true) => {
    setLoading(true);
    let res = action ? await linkStudentListsAction(courseId, lists) : await unlinkStudentListsAction(courseId, lists);
    if (res.error !== false) {
      setError(String(res.error));
    } else {
      setData(res.data);
      setError("");
    }

    setLoading(false);
  }

  return (
    <>
      {error !== "" && (
        <div className="rounded-md bg-red-50 p-4 my-2 text-sm text-red-500">
          <b>Eroare la actualizare liste curs</b> {error}
        </div>
      )}
      <List className={loading ? "opacity-50 cursor-wait" : ""}>
        {data.map(list => (
          <ListItem key={list.id}>
            <span className="w-2/6 text-ellipsis overflow-hidden min-w-[200px]" title={list.name}>{list.name}</span>
            <span className="w-4/6 text-ellipsis overflow-hidden mx-2" title={list.students.map(student => student.email).join("; ")}>{list.students.length} studenți: {list.students.map(student => student.email).join("; ")}</span>
            <Link href={`/admin/students/edit/${list.id}`} className="w-6 p-0.5 mx-1 hover:text-teal-400" title="Modificare listă">
              <PencilIcon></PencilIcon>
            </Link>
            <span className="w-6 p-0.5 hover:text-red-500 cursor-pointer" title="Eliminare legătură" onClick={() => studentListsHandler([list.id], false)}>
              <XCircleIcon></XCircleIcon>
            </span>
          </ListItem>
        ))}
        {data.length === 0 && (
          <ListItem>Cursul nu are înrolată nicio listă de studenți</ListItem>
        )}
      </List>
      <Button
        variant="light"
        size="xs"
        color="teal"
        className={`mt-2 ${loading ? "opacity-50 select-none pointer-events-none" : ""}`}
        icon={PlusIcon}
        iconPosition="left"
        onClick={() => setDialogOpen(true)}
      >
        Înrolare liste studenți
      </Button>
      <SelectStudentListDialog
        lists={lists}
        open={dialogOpen}
        setOpen={setDialogOpen}
        onSelectLists={studentListsHandler}
      />
    </>
  );
}
