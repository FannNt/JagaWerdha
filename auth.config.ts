import type { NextAuthConfig } from "next-auth";
import { UserRole } from "@/app/generated/prisma/enums";

export default {
  providers: [],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isOnboarded = token.isOnboarded as boolean;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

