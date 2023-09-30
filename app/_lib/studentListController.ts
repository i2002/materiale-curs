import { cache } from "react";
import { getCurrentUser } from "./usersController";
import prisma from "./prisma";

export const getStudentLists = cache(async () => {
  let user = await getCurrentUser();

  if (!user || user.role != "admin") {
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
