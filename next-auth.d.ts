import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { UserRole, SubscriptionType } from "@prisma/client"; // Ensure these imports

declare module "next-auth" {
  interface User extends DefaultUser {
    role: UserRole;
    subscriptionId?: string | null; // Adjusted to match returned type
    subscriptionType?: SubscriptionType | null; // Adjusted to match returned type
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
      subscriptionId?: string | null;
      subscriptionType?: SubscriptionType | null;
    } & DefaultSession["user"];
  }

  interface JWT {
    role: UserRole;
    subscriptionId?: string | null;
    subscriptionType?: SubscriptionType | null;
  }
}
