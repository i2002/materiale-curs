import { notFound } from "next/navigation";
import { getResource } from "@/lib/controllers/resourceController";
import PDFViewer from "../PDFViewer";

interface Props {
  resId: string;
}

export default async function ResourceViewer({ resId }: Props) {
  let res = await getResource(resId);
  if (!res) {
    notFound();
  }

  return (
    <PDFViewer name={res.name} resUrl={`/api/resource/${res.id}`} />
  )
}