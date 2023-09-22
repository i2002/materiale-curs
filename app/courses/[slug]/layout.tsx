import HeroBanner from "@/app/_components/HeroBanner"

export default function CourseLayout({
  children,
  preview,
  params
}: {
  children: React.ReactNode,
  preview: React.ReactNode
  params: { slug: string }
}) {
  return (
    <div>
      <HeroBanner title="Rețele" subtitle="Anul 2, Semestrul 1"></HeroBanner>
      <div>{preview}</div>
      <div>{children}</div>
    </div>
  )
}
