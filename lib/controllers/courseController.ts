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
 * Update course.
 *
 * @param id the id of the course to update
 * @param data the new data for the course
 * @returns the updated course
 */
export async function updateCourse(id: number, data: Prisma.CourseUpdateInput) {
  await adminPermissionOrThrow();

  let course = await prisma.course.update({
    where: { id: id },
    data: data
  });

  return course;
}


/**
 * Link student lists to course.
 *
 * @param courseId the id of the course to be modified
 * @param listIds the ids of the lists to be linked to the course
 * @returns the updated array of lists linked to the course
 */
export async function linkStudentLists(courseId: number, listIds: number[]) {
  let lists = await prisma.course.update({
    where: { id: courseId },
    data: {
      enrolments: { connect: listIds.map(id => ({ id: id })) }
    }
  }).enrolments({
    include: {
      students: true
    }
  });

  return lists;
}


/**
 * Link student lists to course.
 *
 * @param courseId the id of the course to be modified
 * @param listIds the ids of the lists to be linked to the course
 * @returns the updated array of lists linked to the course
 */
export async function unlinkStudentLists(courseId: number, listIds: number[]) {
  let lists = await prisma.course.update({
    where: { id: courseId },
    data: {
      enrolments: { disconnect: listIds.map(id => ({ id: id })) }
    }
  }).enrolments({
    include: {
      students: true
    }
  });

  return lists;
}


/**
 * Delete course.
 *
 * @param id the id of the course to be deleted
 */
export async function deleteCourse(id: number) {
  // TODO: delete resources
  await prisma.resource.deleteMany({
    where: { courseId: id }
  });

  await prisma.course.delete({
    where: { id: id }
  });
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
 *
 * @param slug the course slug
 * @returns the course or null if not found or insufficient permissions
 */
export const getCourse = cache(async (slug: string) => {
  let course = await prisma.course.findUnique({
    where: { slug: slug }
  });

  return course && await hasCoursePermission(course) ? course : null;
});


/**
 * Query course info by course id.
 * 
 * @param id the course id
 * @returns the course or null if not found or insufficient permissions
 */
export const getCourseById = cache(async (id: number) => {
  let course = await prisma.course.findUnique({
    where: { id: id }
  });

  return course && await hasCoursePermission(course) ? course : null;
});


/**
 * Get all student lists linked to a course.
 * 
 * @param courseId the id of the specified course
 * @returns the lists linked to a course
 */
export const getCourseLinkedLists = cache(async (courseId: number) => {
  return await prisma.course.findUnique({
    where: { id: courseId }
  }).enrolments({
    include: {
      students: true
    }
  });
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
