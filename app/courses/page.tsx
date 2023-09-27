import { Grid } from "@tremor/react";
import HeroBanner from "../_components/HeroBanner";
import CourseCard from "./_components/CourseCard";
import { getCourses } from "../_lib/courseController";
import { Suspense } from "react";

const CourseList = async () => {
  let courses = await getCourses();
  return courses.map(course => (
    <CourseCard course={course} key={course.slug}></CourseCard>
  ));
}

const LoadingCourseList = () => [...Array(3)].map((_, i) => (
  <div className="bg-slate-300 rounded h-24 animate-pulse" key={i}></div>
));

export default async function Page() {
  return (
    <>
      <HeroBanner title="Materii"></HeroBanner>
      <Grid numItemsMd={3} numItems={1} className="gap-3 md:p-6 px-3">
        <Suspense fallback={<LoadingCourseList/>}>
          <CourseList></CourseList>
        </Suspense>
      </Grid>
    </>
  );
}
