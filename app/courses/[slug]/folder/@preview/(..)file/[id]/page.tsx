import FilePreview from "@/components/courses/FilePreview";
import Modal from "@/components/ui/Modal";

interface Props {
  params: {
    slug: string;
    id: string;
  }
}

export default function Page({ params }: Props) {
  return (
    <Modal title="File preview">
      <FilePreview resId={params.id} />
    </Modal>
  );
}
