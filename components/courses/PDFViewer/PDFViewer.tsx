"use client"

import dynamic from "next/dynamic";
import ResourceViewerHeader from "../ResourceViewer/ResourceViewerHeader";
import PDFViewerToolbar from "./PDFViewerToolbar";
import { PDFViewerProvider } from "./PDFViewerContext";
const PDFViewerContent = dynamic(() => import("./PDFViewerContent"), { ssr: false, });


interface Props {
  name: string;
  resUrl: string;
}

export default function PDFViewer({ name, resUrl }: Props) {
  return (
    <PDFViewerProvider>
      <ResourceViewerHeader
        name={name}
        toolbar={<PDFViewerToolbar />}
      >
        <PDFViewerContent resUrl={resUrl} />
      </ResourceViewerHeader>
    </PDFViewerProvider>
  );
}
