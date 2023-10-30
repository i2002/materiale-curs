"use client"

import { useEffect, useRef } from "react";
import ResourceViewerHeader from "../ResourceViewer/ResourceViewerHeader";

interface Props {
  name: string;
  resUrl: string;
}

export default function IFrameViewer({ name, resUrl }: Props) {
  return (
    <ResourceViewerHeader name={name}>
      <iframe src={resUrl} className="w-full h-full absolute z-10" sandbox="allow-scripts" onLoad={(e) => {
        console.log("AAA");
        console.log(e);
      }}></iframe>
      <span className="absolute top-0 w-full h-full text-white">H</span>
    </ResourceViewerHeader>
  );
}
