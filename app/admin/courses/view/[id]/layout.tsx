import TabList from "@/components/admin/layout/TabList";
import { Card } from "@tremor/react";

const courseTabs = [
  { label: "Fișiere curs", href: "files" },
  { label: "Liste studenți înscriși", href: "enrolments" }
]

export default async function CourseViewLayout({
  children,
  tabs,
  params
}: {
  children: React.ReactNode;
  tabs: React.ReactNode;
  params: { id: string };
}) {
  return (
    <>
      {children}
      <Card className="pt-2 pb-3 w-auto">
        <div className="w-full">
          <TabList root={`/admin/courses/view/${params.id}`} tabs={courseTabs}></TabList>
          <div className="w-full mt-2">
            {tabs}
          </div>
        </div>
      </Card>
    </>
  );
}
