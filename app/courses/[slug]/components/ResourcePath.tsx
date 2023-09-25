import { ResourcePath } from "@/app/_lib/courseController";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Text } from "@tremor/react";
import Link from "next/link";

// FIXME: refactor to receive a resource as argument

const getSegmentHref = (id: string, slug: string) => `/courses/${slug}/resource/${id}`;

export default function ResourcePath({ path, slug }: { path: ResourcePath, slug: string }) {
  return (
    <div className="flex p-3 mb-2 border bg-slate-100 items-center rounded-md">
      <Link href={`/courses/${slug}`}>
        <HomeIcon className="w-5 h-5 text-gray-600 hover:text-black"></HomeIcon>
      </Link>
      {path.map((item, index, array) => (
        <>
          <ChevronRightIcon className="w-5 h-5 text-gray-600 mx-1" key={`arrow-${index}`}></ChevronRightIcon>
          <Link href={getSegmentHref(item.id, slug)} key={`segment-${index}`}>
            <Text className={index === array.length - 1 ? "font-medium" : "hover:text-black hover:underline underline-offset-4"}>{item.name}</Text>
          </Link>
        </>
      ))}
    </div>
  );
}
