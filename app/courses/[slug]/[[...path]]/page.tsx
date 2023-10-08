import { getResource } from "@/lib/controllers/resourceController";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: { slug: string, path: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let res = await getResource(params.slug, params.path);

  if (!res || res.parentId == null) {
    return {};
  }

  return {
    title: res.name
  };
}

export default function Page() {
  return null;
}
