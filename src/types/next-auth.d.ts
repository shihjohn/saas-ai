import type { User } from "next-auth";
import { JWT } from "next-auth/jwt";

enum UserRole {
  USER,
  PRO_USER,
  ADMIN,
}

type UserId = ObjectId;

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & {
      _id: UserId;
      role: UserRole;
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    _id: UserId;
    role: UserRole;
  }
}
