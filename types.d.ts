// Extend NextAuth types
export enum Role {
  student = "student",
  admin = "admin",
}

interface IUser extends DefaultUser {
  /**
   * Role of user
   */
  role?: Role;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}

// URL params types
interface SearchParams {
  [key: string]: string | string[] | undefined
}
