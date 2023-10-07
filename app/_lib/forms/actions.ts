"use server"

import { revalidatePath } from "next/cache";
import { studentListFormSchema } from "./form_schemas";
import prisma from "../prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createStudentList(values: {[key: string]: string}) {
  let data;
  try {
    data = await studentListFormSchema.validate(values);
  } catch (err) {
    console.log(err); // FIXME: error logging
    return {
      error: "Eroare la validare date"
    };
  }

  let studentEmails = data.emails && data.emails != "" ? data.emails?.split(";") : [];
  try {
    await prisma.studentList.create({
      data: {
        name: data.listName,
        students: {
          connectOrCreate: studentEmails.map(email => ({
            where: { email: email },
            create: { email: email }
          }))
        }
      }
    });
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

export async function deleteStudentList(listId: number) {
  try {
    await prisma.studentList.delete({
      where: { id: listId }
    });
  } catch(error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      console.log("Unknown list id.");
    } else {
      console.error(error); // FIXME: error logging
    }
  }

  revalidatePath("/admin/students");
}
