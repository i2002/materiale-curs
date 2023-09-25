import HeroBanner from "@/app/_components/HeroBanner"
import { getCourse } from "@/app/_lib/courseController"
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

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
  preview,
  params
}: {
  children: React.ReactNode,
  preview: React.ReactNode
  params: { slug: string }
}) {
  let course = await getCourse(params.slug);

  if (!course) {
    notFound();
  }

  return (
    <div>
      <HeroBanner title={course.name} subtitle={`Anul ${course.year}, Semestrul ${course.semester}`}></HeroBanner>
      <div>{preview}</div>
      <div>{children}</div>
    </div>
  )
}
