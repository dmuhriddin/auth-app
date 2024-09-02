import { connectDB } from "@/utils/config/mongoose";
import User from "@/utils/models/user";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";

// Foydalanuvchi tipini kengaytirish
declare module "next-auth" {
  interface User {
    _id: string;
    password: string;
  }
}

// Sessiya tipini kengaytirish
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      password?: string;
    };
  }
}
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          await connectDB();

          const user = await User.findOne({ email });

          if (!user) {
            throw new Error("This email is not registered");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            throw new Error("Incorrect password");
          }

          return user; // Foydalanuvchini qaytaradi, bu jwt callbackida foydalaniladi
        } catch (error: any) {
          throw new Error(error.message || "Server error");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id.toString();
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET!,

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
