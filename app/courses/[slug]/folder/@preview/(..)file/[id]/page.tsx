import ResourceViewer from "@/components/courses/ResourceViewer";
import { metaFilename } from "@/components/courses/ResourceViewer/ResourceViewer";

interface Props {
  params: {
    slug: string;
    id: string;
  }
}

export const generateMetadata = ({ params }: Props) => metaFilename(params.id);

export default function Page({ params }: Props) {
  return (
    <ResourceViewer resId={params.id} />
  );
}
