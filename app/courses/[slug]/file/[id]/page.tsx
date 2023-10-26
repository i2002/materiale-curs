import FilePreview from "@/components/courses/FilePreview";

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
    <FilePreview resId={params.id}/>
  );
}
