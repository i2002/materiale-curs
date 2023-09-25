import { getResourcePath } from "@/app/_lib/courseController";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Text } from "@tremor/react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string, path: string[] };
}

const getSegmentHref = (id: string, slug: string) => `/courses/${slug}/resource/${id}`;

export default async function ResourcePathView({ params }: Props) {
  let path = await getResourcePath(params.slug, params.path);
  if (path == null) {
    notFound();
  }

  return (
    <>
      <Link href={`/courses/${params.slug}`}>
        <HomeIcon className="w-5 h-5 text-gray-600 hover:text-black"></HomeIcon>
      </Link>
      {path.map((item, index, array) => (
        <>
          <ChevronRightIcon className="w-5 h-5 text-gray-600 mx-1" key={`arrow-${index}`}></ChevronRightIcon>
          <Link href={getSegmentHref(item.id, params.slug)} key={`segment-${index}`}>
            <Text className={index === array.length - 1 ? "font-medium" : "hover:text-black hover:underline underline-offset-4"}>{item.name}</Text>
          </Link>
        </>
      ))}
    </>
  );
}
