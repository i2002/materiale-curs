import Image from "next/image";
import ResourceViewerHeader from "../ResourceViewer/ResourceViewerHeader";

interface Props {
  name: string;
  resUrl: string;
}

export default function ImageViewer({ name, resUrl }: Props) {
  return (
    <ResourceViewerHeader name={name}>
      <Image alt={name} src={resUrl}></Image>
    </ResourceViewerHeader>
  );
}