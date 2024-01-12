import ResourceViewer from "@/components/courses/ResourceViewer";

interface Props {
  params: {
    fileid: string;
  }
}

export default function Page({ params }: Props) {
  return (
    <ResourceViewer resId={params.fileid} />
  );
}
