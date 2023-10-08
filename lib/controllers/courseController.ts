import { cache } from "react";
import { Course, Prisma, Resource } from "@prisma/client";
import prisma from "@/lib/prisma";
import { adminPermissionOrThrow, getCurrentUser, hasCoursePermission } from "./usersController";


/**
 * Create course.
 *
 * @param data new course data
 * @returns the created course object
 */
export async function createCourse(data: Prisma.CourseCreateInput) {
  await adminPermissionOrThrow();

  // create course
  let course = await prisma.course.create({ data: data });
  
  // create course root folder
  await prisma.resource.create({
    data: {
      name: `Root for course ${course.id}`,
      courseId: course.id,
      parentId: null
    }
  });

  return course;
}


/**
 * Query all courses info.
 * @returns 
 */
export const getCourses = cache(async () => {
  let user = await getCurrentUser();
  if (!user) {
    return [];
  }

  return await prisma.course.findMany({
    where: user.role !== "admin" ? {
      enrolments: { some: { students: { some: { email: user.email } } } }
    } : undefined,
    orderBy: [
      { year: "asc" },
      { semester: "asc" },
      { name: "asc" }
    ]
  });
});


/**
 * Query a course info.
 * @param slug the course slug
 * @returns 
 */
export const getCourse = cache(async (slug: string) => {
  let course = await prisma.course.findUnique({
    where: { slug: slug }
  });

  return course && await hasCoursePermission(course) ? course : null;
});


/**
 * Get all enrolled students in a course.
 * @param course the specified course
 * @returns 
 */
export const getCourseEnrolledStudents = cache(async (course: Course) => {
  return await prisma.user.findMany({
    where: {
      role: "student",
      lists: { some: { enroledCourses: { some: { slug: course.slug } } } }
    }
  });
});
