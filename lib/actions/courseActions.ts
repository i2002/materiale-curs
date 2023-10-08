"use server"

import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CourseFormSchema, courseFormSchema } from "./form_schemas";
import { createCourse } from "../controllers/courseController";


/**
 * Create course server action.
 *
 * @param values form input
 * @returns 
 */
export async function createCourseAction(values: CourseFormSchema) {
  let data;
  try {
    data = await courseFormSchema.validate(values);
  } catch (err) {
    console.log(err); // FIXME: error logging
    return {
      error: "Eroare la validare date."
    }
  }

  try {
    let course = await createCourse(data);
    revalidatePath("/admin/courses");
    revalidatePath("/courses/");
    return {
      courseId: course.id
    };
  } catch (err) {
    console.error(err); // FIXME: error logging

    let message = "Eroare la creare curs. Încercați din nou.";
    if (err instanceof PrismaClientKnownRequestError && err.code == "P2002") {
      message = "Identificator curs deja existent.";
    }
    return {
      error: message
    };
  }
}


/**
 * Update course server action.
 *
 * @param courseId the id of the course to be updated
 * @param values form input
 * @returns 
 */
export async function updateCourseAction(courseId: number, values: CourseFormSchema) {
  
  return courseId ? { error: "" } : { courseId: courseId };
}
