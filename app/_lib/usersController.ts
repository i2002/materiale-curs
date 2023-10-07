import { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import prisma from "./prisma";
import bcrypt from "bcrypt";
import { cache} from "react";
import { Role } from "@/types";
import { Course, Resource } from "@prisma/client";
import { getUserSession } from "./auth";
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

export const hasResourcePermission = cache(async (res: Resource) => {
  let course = await prisma.course.findUnique({
    where: { slug: res.courseSlug }
  });

  if (!course) {
    return null;
  }

  return hasCoursePermission(course);
});

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

export const hasAdminPermission = cache(async () => {
  let user = await getCurrentUser();
  return user && user.role === "admin";
});
