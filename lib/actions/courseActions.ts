import { CourseFormSchema } from "./form_schemas";

export async function updateCourseAction(courseId: number, values: CourseFormSchema) {
  
  return courseId ? { error: "" } : { courseId: courseId };
}

export async function createCourseAction(values: CourseFormSchema) {
  return values.name ? { error: "" } : { courseId: 0 };
}