import Image from "next/image";
import ResourceViewerHeader from "../ResourceViewer/ResourceViewerHeader";

interface Props {
  name: string;
  resUrl: string;
}

export default function ImageViewer({ name, resUrl }: Props) {
  return (
    <ResourceViewerHeader name={name}>
      <div className="relative h-screen w-full">
        <Image alt={name} src={resUrl} className="object-contain" fill />
      </div>
    </ResourceViewerHeader>
  );
}