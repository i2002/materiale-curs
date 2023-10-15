import FolderView from "@/components/admin/dataView/FolderView";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ params }: Props) {
  const courseId = parseInt(params.id);
  return (
    <FolderView courseId={courseId}></FolderView>
  );
}
