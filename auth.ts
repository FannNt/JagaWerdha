import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import authConfig from "@/auth.config";
import { UserRole } from "@/app/generated/prisma/enums";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const extendedUser = user as any;
        token.role = extendedUser.role;

        let isOnboarded = false;
        if (extendedUser.role === UserRole.ADMIN) {
          isOnboarded = true;
        } else if (extendedUser.role === UserRole.ORANGTUA) {
          isOnboarded = !!extendedUser.orangTuaProfile;
        } else if (extendedUser.role === UserRole.PENDAMPING) {
          isOnboarded = !!extendedUser.pendampingProfile;
        }
        token.isOnboarded = isOnboarded;
      }

      if (trigger === "update" && session) {
        token.isOnboarded = session.isOnboarded;
      }

      if (!token.sub) return token;

      if (token.role === undefined || token.isOnboarded === undefined || token.isOnboarded === false) {
        const existingUser = await prisma.user.findUnique({
          where: { id: parseInt(token.sub) },
          include: {
            orangTuaProfile: true,
            pendampingProfile: true,
          },
        });

        if (existingUser) {
          token.name = existingUser.name;
          token.email = existingUser.email;
          token.role = existingUser.role;

          let isOnboarded = false;
          if (existingUser.role === UserRole.ADMIN) {
            isOnboarded = true;
          } else if (existingUser.role === UserRole.ORANGTUA) {
            isOnboarded = !!existingUser.orangTuaProfile;
          } else if (existingUser.role === UserRole.PENDAMPING) {
            isOnboarded = !!existingUser.pendampingProfile;
          }
          token.isOnboarded = isOnboarded;
        }
      }

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: email as string },
          include: {
            orangTuaProfile: true,
            pendampingProfile: true,
          }
        });

        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          password as string,
          user.password
        );

        if (passwordsMatch) {
          return {
            ...user,
            id: user.id.toString(),
          };
        }

        return null;
      },
    }),
  ],
});