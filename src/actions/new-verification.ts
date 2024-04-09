"use server";
import User from "@/models/user";
import { getUserByToken } from "@/lib/data/user";

export const newVerification = async (token: string) => {
  const user = await getUserByToken(token);
  if (!user) {
    return { error: "Token does not exist"! };
  }
  const hasExpired = new Date(user.emailVerificationExpires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired"! };
  }
  const filter = { email: user.email };
  const update = {
    emailVerified: new Date(),
    emailVerificationToken: "",
    emailVerificationExpires: null,
  };
  await User.findOneAndUpdate(filter, update);
  return {
    success: "Your email was verified. You can continue using the application.",
  };
};
