import { cache } from "react";
import { hasAdminPermission } from "./usersController";
import prisma from "./prisma";

export const getStudentLists = cache(async () => {
  if (!hasAdminPermission()) {
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

export const getStudentList = cache(async (listId: number) => {
  if (!hasAdminPermission()) {
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
