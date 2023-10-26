import { getResource, getResourceChildren } from "@/lib/controllers/resourceController";
import { notFound } from "next/navigation";
import ResourceListItem from "@/components/courses/ResourceListItem";

type Props = {
  params: { slug: string, path: string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params } : Props) {
  let children = await getResourceChildren(await getResource(params.path, params.slug));
  if (!children) {
    notFound();
  }

  return children.map(item => (
    <ResourceListItem resource={item} slug={params.slug} key={item.id}></ResourceListItem>  
  ));
}
