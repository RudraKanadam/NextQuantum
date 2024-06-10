import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: UserRole;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface JWT {
    role: UserRole;
  }
}
