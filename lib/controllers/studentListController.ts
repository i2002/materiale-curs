import { cache } from "react";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { adminPermissionOrThrow, deleteOrphanStudents, hasAdminPermission } from "./usersController";


const getEmails = (emails: string | undefined) => emails && emails != "" ? emails?.split(";") : [];

/**
 * Create student list.
 *
 * @param name the name of the list
 * @param emails the emails of the students to be added to the list (separated by ;)
 */
export async function createStudentList(name: string, emails: string | undefined) {
  await adminPermissionOrThrow();
  let studentEmails = getEmails(emails);

  await prisma.studentList.create({
    data: {
      name: name,
      students: {
        connectOrCreate: studentEmails.map(email => ({
          where: { email: email },
          create: { email: email }
        }))
      }
    }
  });
}

const getPrevEmails = async (id: number) =>  {
  let students = await prisma.studentList.findFirstOrThrow({
    where: { id: id }
  }).students();

  return students
    .map(stud => stud.email)
    .filter(email => email != null) as string[];
}


/**
 * Update student list.
 *
 * @param id the id of the list to update
 * @param name the new name of the list
 * @param emails the new emails list (separated by ;)
 */
export async function updateStudentList(id: number, name: string, emails: string | undefined) {
  await adminPermissionOrThrow();

  // current and previous email list
  let studentEmails = getEmails(emails);
  let prevEmails = await getPrevEmails(id);
 
  // get added and removed emails
  let addedEmails = studentEmails.filter(email => !prevEmails.includes(email));
  let removedEmails = prevEmails.filter(email => !studentEmails.includes(email));

  // update list data and connections
  await prisma.studentList.update({
    where: { id: id },
    data: {
      name: name,
      students: {
        connectOrCreate: addedEmails.map(email => ({
          where: { email: email },
          create: { email: email }
        })),
        disconnect: removedEmails.map(email => ({
          email: email
        })),
      }
    }
  });

  // delete orphan students
  await deleteOrphanStudents();
}


/**
 * Delete student list.
 * @param id the id of the list to be deleted
 */
export async function deleteStudentList(id: number) {
  await prisma.studentList.delete({
    where: { id: id }
  });

  await deleteOrphanStudents();
}


/**
 * Get all student lists.
 */
export const getStudentLists = cache(async () => {
  if (!await hasAdminPermission()) {
    return [];
  }

  return await prisma.studentList.findMany({
    orderBy: [
      { name: "asc" }
    ],
    include: {
      _count: {
        select: {
          students: true
        }
      }
    }
  });
});


/**
 * Get a student list by id
 * 
 * @param listId the id of the list to get
 * @returns the selected list or null if not found
 */
export const getStudentList = cache(async (listId: number) => {
  if (!await hasAdminPermission()) {
    return null;
  }

  let list = await prisma.studentList.findUnique({
    where: { id: listId },
    include: {
      students: true
    }
  });

  return list;
});

export type StudentListWithStudents = Prisma.PromiseReturnType<typeof getStudentList>
