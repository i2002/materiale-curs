import { Metadata, ResolvingMetadata } from "next";
import { Card } from "@tremor/react";
import ResourcePath from "./ResourcePath";
import ResourceList from "./ResourceList";
import { getCourse, getResource, getResourcePath } from "@/app/_lib/courseController";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string, res_id?: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let res = await getResource(params.res_id, params.slug);

  return {
    title: res?.name
  }
}

export default async function FolderView({ params, searchParams } : Props) {
  let res = await getResource(params.res_id, params.slug);
  if (!res) {
    notFound();
  }
  let path = await getResourcePath(res);

  return (
    <>
      <div className="p-6">
        <Card className="">
          <ResourcePath path={path} slug={params.slug}></ResourcePath>
          <ResourceList resources={res.children} slug={params.slug}></ResourceList>
        </Card>
      </div>
    </>
  );
}
