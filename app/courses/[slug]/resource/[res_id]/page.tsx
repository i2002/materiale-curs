import FolderView from "../../components/FolderView";
export { generateMetadata } from "../../components/FolderView";

type Props = {
  params: { slug: string, res_id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ params, searchParams } : Props) {
  return (
    <FolderView params={params} searchParams={searchParams}></FolderView>
  );
}
