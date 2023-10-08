"use server"

import { revalidatePath } from "next/cache";
import { StudentListFormSchema, studentListFormSchema } from "./form_schemas";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createStudentList, deleteStudentList, updateStudentList } from "../controllers/studentListController";

/**
 * Create student list server action.
 *
 * @param values form input
 * @returns 
 */
export async function createStudentListAction(values: StudentListFormSchema) {
  let data;
  try {
    data = await studentListFormSchema.validate(values);
  } catch (err) {
    console.log(err); // FIXME: error logging
    return {
      error: "Eroare la validare date"
    };
  }

  try {
    await createStudentList(data.listName, data.emails);
  } catch (e) {
    console.error(e); // FIXME: error logging

    let message = "Eroare la creare listă. Încercați din nou.";
    if (e instanceof PrismaClientKnownRequestError && e.code == "P2002") {
      message = "Nume listă existent.";
    }
    return {
      error: message
    };
  }

  revalidatePath("/admin/students/");
}


/**
 * Update student list server action.
 *
 * @param listId the id of the updated list
 * @param values form input
 * @returns 
 */
export async function updateStudentListAction(listId: number, values: {[key: string]: string}) {
  // validate input
  let data;
  try {
    data = await studentListFormSchema.validate(values);
  } catch (err) {
    console.log(err); // FIXME: error logging
    return {
      error: "Eroare la validare date"
    };
  }

  try {
    await updateStudentList(listId, data.listName, data.emails);
  } catch (e) {
    console.error(e); // FIXME: error logging

    let message = "Eroare la creare listă. Încercați din nou.";
    if (e instanceof PrismaClientKnownRequestError) {
      switch(e.code) {
        case "P2002":
          message = "Nume listă existent.";
          break;

        case "P2025":
          message = "Lista nu a fost găsită.";
          break;
      }
    }
    return {
      error: message
    };
  }

  revalidatePath("/admin/students");
}


/**
 * Delete student list server action.
 *
 * @param listId the id of the list to be deleted
 */
export async function deleteStudentListAction(listId: number) {
  try {
    await deleteStudentList(listId);
  } catch(error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      console.log("Unknown list id.");
    } else {
      console.error(error); // FIXME: error logging
    }
  }

  revalidatePath("/admin/students");
}
