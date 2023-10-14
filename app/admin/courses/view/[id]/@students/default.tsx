import CourseStudentListsForm from "@/components/admin/forms/CourseStudentListsForm";
import { getCourseLinkedLists } from "@/lib/controllers/courseController";
import { getStudentLists } from "@/lib/controllers/studentListController";


type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params }: Props) {
  let courseId = parseInt(params.id);
  const lists = await getStudentLists();
  const linkedLists = await getCourseLinkedLists(courseId) ?? [];

  return (
    <CourseStudentListsForm courseId={courseId} initialData={linkedLists} lists={lists}></CourseStudentListsForm>
  );
}
