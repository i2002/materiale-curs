import ResourceViewer from "@/components/courses/ResourceViewer";
import { metaFilename } from "@/components/courses/ResourceViewer/ResourceViewer";

interface Props {
  params: {
    fileid: string;
  }
}

export const generateMetadata = async ({ params }: Props) => {
  let meta = await metaFilename(params.fileid);
  return {
    ...meta,
    title: `Panou administrare | ${meta.title}`
  }
};

export default function Page({ params }: Props) {
  return (
    <ResourceViewer resId={params.fileid} />
  );
}
