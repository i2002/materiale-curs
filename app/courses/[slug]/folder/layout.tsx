import HeroBanner from "@/components/ui/HeroBanner"
import { getCourse } from "@/lib/controllers/courseController"
import { Card } from "@tremor/react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import ResourceList from "@/components/courses/ResourceList";
import { SearchParams } from "@/types";

interface Props {
  params: { slug: string }
  searchParams: SearchParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let course = await getCourse(params.slug);

  return {
    title: {
      template: `%s - ${course?.name}`,
      default: `${course?.name} | Materiale curs` ?? "Materiale curs"
    }
  }
}

export default async function CourseLayout({
  children,
  resource_nav,
  preview,
  params
}: {
  children: React.ReactNode;
  preview: React.ReactNode;
  resource_nav: React.ReactNode;
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
          <div className="flex p-3 mb-2 box-content h-5 overflow-hidden border bg-slate-100 items-center rounded-md">
            {resource_nav}
          </div>
          <ResourceList>
            {children}
          </ResourceList>
        </Card>
      </div>
      <div>{preview}</div>
    </div>
  )
}
