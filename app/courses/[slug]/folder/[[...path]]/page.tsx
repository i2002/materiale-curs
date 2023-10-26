import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getResource, getResourceChildren } from "@/lib/controllers/resourceController";
import ResourceListItem from "@/components/courses/ResourceListItem";
import { SearchParams } from "@/types";

interface Props {
  params: { slug: string, path: string[] };
  searchParams: SearchParams;
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let res = await getResource(params.path, params.slug);

  if (!res || res.parentId == null) {
    return {};
  }

  return {
    title: res.name
  };
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
