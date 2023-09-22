import { Metadata, ResolvingMetadata } from "next";
import { Card } from "@tremor/react";
import ResourcePath from "./ResourcePath";
import ResourceList from "./ResourceList";

type Props = {
  params: { slug: string, res_id?: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: params?.slug
  }
}

const getPath = (slug: string, res_id: string | undefined) => {
  const path = [
    {
      name: "Semestrul 1",
      href: `/courses/${slug}`
    },
    {
      name: "Saptamana 1",
      href: "#"
    }
  ];

  if (res_id === undefined) {
    path.pop();
  }

  return path;
}

const getResources = (slug: string, res_id: string | undefined) => {
  if (res_id === undefined) {
    return [
      {
        name: "Saptamana 1",
        type: "folder",
        size: "1",
        modified: "20 apr",
        href: `/courses/${slug}/resource/1`
      },
      {
        name: "Saptamana 2",
        type: "folder",
        size: "",
        modified: "20 apr 2019",
        href: `/courses/${slug}/resource/2`
      },
      {
        name: "Saptamana 3",
        type: "folder",
        size: "",
        modified: "20 apr",
        href: `/courses/${slug}/resource/3`
      },
      {
        name: "Introducere.pdf",
        type: "document",
        size: "1.3Mb",
        modified: "20 apr",
        href: `/courses/${slug}/preview/4`
      },
      {
        name: "Evaluare.pdf",
        type: "document",
        size: "1.2Mb",
        modified: "20 apr",
        href: `/courses/${slug}/preview/5`
      },
    ];
  } else {
    return [
      {
        name: "Lectia1.pdf",
        type: "document",
        size: "1.2Mb",
        modified: "20 apr",
        href: `/courses/${slug}/preview/6`
      },
      {
        name: "Tema1.pdf",
        type: "document",
        size: "1.2Mb",
        modified: "20 apr",
        href: `/courses/${slug}/preview/7`
      },
    ]
  }

}

export default function FolderView({ params, searchParams } : Props) {
  console.log(params.res_id, searchParams);

  return (
    <>
      <div className="p-6">
        <Card className="">
          <ResourcePath path={getPath(params.slug, params.res_id)} root="#"></ResourcePath>
          <ResourceList resources={getResources(params.slug, params.res_id)}></ResourceList>
        </Card>
      </div>
    </>
  );
}
