"use client"

import ResourceViewerHeader from "../ResourceViewer/ResourceViewerHeader";

interface Props {
  name: string;
  resUrl: string;
}

export default function IFrameViewer({ name, resUrl }: Props) {
  return (
    <ResourceViewerHeader name={name}>
      <iframe src={resUrl} className="w-full h-full" sandbox=""></iframe>
    </ResourceViewerHeader>
  );
}
