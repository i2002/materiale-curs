import { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import prisma from "./prisma";
import bcrypt from "bcrypt";
import { Role } from "@/types";

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
      where: {id: user.id, email: user.email}
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
