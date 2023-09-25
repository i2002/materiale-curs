import { Grid } from "@tremor/react";
import HeroBanner from "../_components/HeroBanner";
import CourseCard from "./_components/CourseCard";
import { getCourses } from "../_lib/courseController";

export default async function Page() {
  let courses = await getCourses();

  return (
    <>
      <HeroBanner title="Materii"></HeroBanner>
      <Grid numItemsMd={3} numItems={1} className="gap-3 md:p-6 px-3">
        {courses.map(course => (
          <CourseCard course={course} key={course.slug}></CourseCard>
        ))}
      </Grid>
    </>
  );
}
