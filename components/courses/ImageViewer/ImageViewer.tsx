import ResourceViewerHeader from "../ResourceViewer/ResourceViewerHeader";

interface Props {
  name: string;
  resUrl: string;
}

export default function ImageViewer({ name, resUrl }: Props) {
  return (
    <ResourceViewerHeader name={name}>
      <img src={resUrl}></img>
    </ResourceViewerHeader>
  );
}