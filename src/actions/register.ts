"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail, getVerificationTokenByEmail } from "@/lib/data/user";
import User from "@/models/user";
import bcrypt from "bcrypt";
// import { generateVerificationToken } from "@/lib/token";
// import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid field!" };
  }
  const { name, email, password } = validatedFields.data;
  // const existingEmailToken = await getVerificationTokenByEmail(email);
  // if (existingEmailToken) {
  //   const verificationToken = await generateVerificationToken(email);
  //   return { success: "Register Email sent!" };
  // }
  const user = await getUserByEmail(email);
  if (user) {
    return { error: "User already exists." };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashedPassword });
  // const verificationToken = await generateVerificationToken(email);
  // try {
  //   sendVerificationEmail({ name, email }, verificationToken);
  return { success: "Register Email sent!" };
  // } catch (err) {
  //   return {
  //     error: "Unable to sent verification email. Please try again later",
  //   };
  // }
};

// import { NextResponse } from "next/server";

// export const register = async (values: z.infer<typeof RegisterSchema>) => {
//   const validatedFields = RegisterSchema.safeParse(values);
//   if (!validatedFields.success) {
//     return NextResponse.json(
//       { message: "An error occurred. Please try again later." },
//       { status: 500 }
//     );
//   }
//   return NextResponse.json({ message: "User Registered." }, { status: 201 });
// };
