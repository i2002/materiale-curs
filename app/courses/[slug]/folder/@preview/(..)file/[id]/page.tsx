import ResourceViewer from "@/components/courses/ResourceViewer";

interface Props {
  params: {
    slug: string;
    id: string;
  }
}

export default function Page({ params }: Props) {
  return (
    <ResourceViewer resId={params.id} />
  );
}
