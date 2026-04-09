import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import pool from "@/lib/mysql";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const [rows]: any = await pool.query(
          "SELECT * FROM admin_users WHERE username = ? LIMIT 1",
          [credentials.username]
        );

        if (!rows || rows.length === 0) return null;

        const user = rows[0];
        console.log("Found user:", user.email);
        
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        console.log("Password valid:", isValid);

        if (!isValid) {
          console.log("Login failed: Invalid password");
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? "festika-admin-secret-2026",
});
