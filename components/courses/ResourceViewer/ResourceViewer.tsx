import { notFound } from "next/navigation";
import { getResource } from "@/lib/controllers/resourceController";
import PDFViewer from "../PDFViewer";
import { Metadata } from "next";
import ImageViewer from "../ImageViewer";
import IFrameViewer from "../IFrameViewer";

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
  console.log(res.fileData.mimeType, res.name);
  switch(res.fileData.mimeType) {
    case "application/pdf":
      return <PDFViewer name={res.name} resUrl={resUrl} />;

    case "image/png":
    case "image/jpeg":
    case "image/svg+xml":
    case "image/webp":
    case "image/gif":
    case "image/apng":
    case "image/avif":
      return <ImageViewer name={res.name} resUrl={resUrl} />;

    default:
      return <IFrameViewer name={res.name} resUrl={resUrl} />;
  }
  return "a";
}
