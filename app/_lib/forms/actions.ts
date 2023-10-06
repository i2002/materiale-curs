"use server"

import { revalidatePath } from "next/cache";
import { studentListFormSchema } from "./form_schemas";
import prisma from "../prisma";

export async function createStudentList(values: {[key: string]: string}) {
  let data;
  try {
    data = await studentListFormSchema.validate(values);
  } catch (err) {
    console.log(err); //FIXME error logging
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
    })
  } catch (e) {
    console.error(e);
    return {
      error: "Eroare la adăugare listă"
    };
  }

  revalidatePath("/admin/students/");
}
