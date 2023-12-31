import { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import bcrypt from "bcrypt";
import { cache} from "react";
import { Course, Resource } from "@prisma/client";
import { Role } from "@/types";
import prisma from "@/lib/prisma";
import { getUserSession } from "@/lib/auth";
import { getCourseEnrolledStudents } from "./courseController";


/**
 * Create a new user.
 *
 * @param username the username for the new user
 * @param password the password for the new user
 * @param role the role of the new user (may be "admin" or "student")
 * @returns User
 */
export async function createUser(username: string, password: string, role: string = "student") {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return prisma.user.create({
    data: {
      email: username,
      password: hashedPassword,
      role
    },
  });
}


/**
 * Delete all students which are not in any list.
 *
 * @returns 
 */
export async function deleteOrphanStudents() {
  return await prisma.user.deleteMany({
    where: { 
      role: "student",
      lists: { none: {} }
    },
  });
}


/**
 * Check if the user is permitted to log in.
 * Only accounts that are already created are allowed to be logged in.
 *
 * @param user NextAuth user object
 * @returns boolean
 */
export async function signInAllowed(user: AdapterUser | User) {
  if (user.email) {
    let found = await prisma.user.findUnique({
      where: { email: user.email }
    });

    if (found) {
      return true;
    }
  }

  return false;
}


/**
 * Authorize credential signin.
 * Check if the credentials provided are correct and return user object.
 *
 * @param credentials username and password provided by the user
 * @returns User
 */
export async function checkSignIn(credentials: Record<"username" | "password", string>): Promise<User | null> {
  const { username, password } = credentials;

  const user = await prisma.user.findUnique({
    where: {email: username}
  });

  if (!user || user.password == null || user.role != "admin") {
    return null;
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role as Role
  }
}


/**
 * Get the current user as valid database entry.
 * @returns 
 */
export const getCurrentUser = cache(async () => {
  let session = await getUserSession();
  if (session?.user?.email) {
    return await prisma.user.findUnique({
      where: { email: session.user.email }
    });
  }

  return null;
});


/**
 * Checks if the current user has permission to acces the specified resource.
 * 
 * @param res the resource
 * @returns true if the current user has permission, false otherwise
 */
export const hasResourcePermission = cache(async (res: Resource) => {
  let course = await prisma.course.findUnique({
    where: { id: res.courseId }
  });

  if (!course) {
    return null;
  }

  return hasCoursePermission(course);
});


/**
 * Checks if the current user has permission to acces the specified course.
 * 
 * @param course the course
 * @returns true if the current user has permission, false otherwise
 */
export const hasCoursePermission = cache(async (course: Course) => {
  let user = await getCurrentUser();

  if (!user) {
    return null;
  }

  if (user.role === "admin") {
    return true;
  }

  let students = await getCourseEnrolledStudents(course);
  return students.find(item => item.email === user?.email);
});


/**
 * Checks if the current user has admin permissions.
 * 
 * @returns true if the current user is admin, false otherwise
 */
export const hasAdminPermission = cache(async () => {
  let user = await getCurrentUser();
  return user && user.role === "admin";
});


/**
 * Throw an exception if the current user is not an admin.
 */
export async function adminPermissionOrThrow() {
  if(!await hasAdminPermission()) {
    throw "Unauthenticated";
  }
}
