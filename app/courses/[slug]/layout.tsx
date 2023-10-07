import HeroBanner from "@/components/ui/HeroBanner"
import { getCourse } from "@/lib/controllers/courseController"
import { Card } from "@tremor/react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import ResourceList from "@/components/courses/ResourceList";

type Props = {
  params: { slug: string }
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
      default: course?.name ?? "Materiale curs"
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
