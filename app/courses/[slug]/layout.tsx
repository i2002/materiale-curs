import HeroBanner from "@/app/_components/HeroBanner"
import { getCourse } from "@/app/_lib/courseController"
import { Card } from "@tremor/react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import ResourceList from "./components/ResourceList";

type Props = {
  params: { slug: string, res_id?: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let course = await getCourse(params.slug);

  return {
    title: {
      template: `%s - ${course?.name}`,
      default: course?.name ?? ""
    }
  }
}

export default async function CourseLayout({
  children,
  resource_path,
  resource_children,
  preview,
  params
}: {
  children: React.ReactNode;
  preview: React.ReactNode;
  resource_path: React.ReactNode;
  resource_children: React.ReactNode;
  params: { slug: string };
}) {
  let course = await getCourse(params.slug);

  if (!course) {
    notFound();
  }

  return (
    <div>
      <HeroBanner
        title={course.name}
        subtitle={`Anul ${course.year}, Semestrul ${course.semester}`}
      />
      <div className="p-6">
        <Card className="">
          <div className="flex p-3 mb-2 border bg-slate-100 items-center rounded-md">
            {resource_path}
          </div>
          <ResourceList>
            {resource_children}
          </ResourceList>
        </Card>
      </div>
      <div>{preview}</div>
      <div>{children}</div>
    </div>
  )
}
