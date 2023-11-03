import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@tremor/react";
import { getResource } from "@/lib/controllers/resourceController";
import ResourceViewerHeader from "./ResourceViewerHeader";
import PDFViewer from "../PDFViewer";
import ImageViewer from "../ImageViewer";
import TextViewer from "../TextViewer";

interface Props {
  resId: string;
}

export async function metaFilename(resId: string): Promise<Metadata> {
  let res = await getResource(resId);

  return {
    title: res?.name
  };
}


export default async function ResourceViewer({ resId }: Props) {
  let res = await getResource(resId);
  if (!res || !res.fileData) {
    notFound();
  }

  const resUrl = `/api/resource/${res.id}`;

  if (res.fileData.mimeType == "application/pdf") {
    return <PDFViewer name={res.name} resUrl={resUrl} />;
  } else if (res.fileData.mimeType.startsWith("image/")) {
    return <ImageViewer name={res.name} resUrl={resUrl} />;
  } else if (res.fileData.mimeType.startsWith("text/")) {
    return <TextViewer name={res.name} resUrl={resUrl} />;
  } else {
    return (
      <ResourceViewerHeader name={res.name}>
        <div className="absolute text-center m-auto top-0 bottom-0 left-0 right-0 max-w-sm h-24 bg-white rounded p-3">
          <p className="mb-3">Resursa specificată nu poate fi previzualizată.</p>
          <Link href={resUrl}>
            <Button color="teal">Descărcare resursă</Button>
          </Link>
        </div>
      </ResourceViewerHeader>
    );
  }
}
