import type { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { getUserByEmail, getVerificationTokenByEmail } from "@/lib/data/user";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { LoginSchema } from "@/schemas";

// https://www.youtube.com/watch?v=1SjqRn_Ira4&t=1064s
// https://youtu.be/1MTyCvS05V4?si=HjFY2Wxn0h5rsvtJ&t=12810

export const options: NextAuthOptions = {
  // secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password:",
          type: "password",
        },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }
        const { email, password } = validatedFields.data;
        // const existingEmailToken = await getVerificationTokenByEmail(email);
        // if (existingEmailToken) {
        //   throw new Error("Please verify your email");
        // }
        const user = await getUserByEmail(email);
        if (user) {
          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );
          if (isPasswordCorrect) return user;
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  // events: {
  //   async linkAccount({ user }) {
  //     const filter = { email: user.email };
  //     const update = { emailVerified: new Date() };
  //     await User.findOneAndUpdate(filter, update);
  //   },
  // },
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      const { name, email } = user;
      if (account.provider === "credentials") {
        // const user = await getUserByEmail(email);
        // if (!user?.emailVerified) return false;
        return true;
      }
      if (account.provider === "google" || account.provider === "github") {
        console.log("user", user);
        console.log("account", account);
        try {
          const existingUser = await User.findOne({ email });
          if (!existingUser) {
            await User.create({
              name,
              email,
              emailVerified: new Date(),
              provider: account.provider,
              image: user.image,
            });
            return true;
          } else {
            const filter = { email: email };
            const update = {
              name,
              provider: account.provider,
              image: user.image,
            };
            await User.findOneAndUpdate(filter, update);
          }
          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.email) return token;
      const existingUser = await getUserByEmail(token.email);
      if (!existingUser) return token;
      token._id = existingUser._id;
      token.role = existingUser.role;
      return token;
    },
  },
};
