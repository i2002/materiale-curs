import { Grid } from "@tremor/react";
import HeroBanner from "../_components/HeroBanner";
import CourseCard from "./_components/CourseCard";

const courses = [
  {
    name: "Autocad",
    description: "Anul 1, Semestrul 2",
    href: "/courses/autocad"
  },
  {
    name: "Rețele 1",
    description: "Anul 2, Semestrul 1",
    href: "#"
  },
  {
    name: "Rețele 2",
    description: "Anul 2, Semestrul 2",
    href: "#"
  },
  {
    name: "Rețele 3",
    description: "Anul 3, Semestrul 1",
    href: "#"
  },
];

export default function Page() {
  return (
    <>
      <HeroBanner title="Materii"></HeroBanner>
      <Grid numItemsMd={3} numItems={1} className="gap-3 md:p-6 px-3">
        {courses.map(course => (
          <CourseCard course={course}></CourseCard>
        ))}
      </Grid>
    </>
  );
}
