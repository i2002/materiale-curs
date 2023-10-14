import { Card, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";

export default async function CourseViewLayout({
  children,
  students,
  files
}: {
  children: React.ReactNode;
  students: React.ReactNode;
  files: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Card className="mx-6 mb-6 pt-2 pb-3 w-auto">
        <TabGroup>
          <TabList color="teal">
            <Tab>Fișiere curs</Tab>
            <Tab>Liste studenți înscriși</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{files}</TabPanel>
            <TabPanel>{students}</TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </>
  );
}
