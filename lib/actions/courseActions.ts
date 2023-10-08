"use server"

import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CourseFormSchema, courseFormSchema } from "./form_schemas";
import { createCourse, deleteCourse, updateCourse } from "../controllers/courseController";


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
  // validate input
  let data;
  try {
    data = await courseFormSchema.validate(values);
  } catch (err) {
    console.log(err); // FIXME: error logging
    return {
      error: "Eroare la validare date"
    }
  }

  try {
    let course = await updateCourse(courseId, data);
    revalidatePath("/admin/courses");
    revalidatePath("/courses/");
    return {
      courseId: course.id
    };
  } catch (err) {
    console.error(err); // FIXME: error logging
    let message = "Eroare la creare listă. Încercați din nou.";
    if (err instanceof PrismaClientKnownRequestError) {
      switch(err.code) {
        case "P2002":
          message = "Identificator curs deja existent.";
          break;

        case "P2025":
          message = "Cursul nu a fost găsit.";
          break;
      }
    }
    return {
      error: message
    }
  }
}


/**
 * Delete course server action.
 * 
 * @param courseId the id of the course
 */
export async function deleteCourseAction(courseId: number) {
  try {
    await deleteCourse(courseId);
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
      console.log("Unknown list id.");
    } else {
      console.error(err); // FIXME: error logging
    }
  }

  revalidatePath("/admin/students");
}
