import ResourceViewer from "@/components/courses/ResourceViewer";


export const metadata = {
  title: "File" // FIXME: window title
}

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
