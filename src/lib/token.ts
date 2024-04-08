import User from "@/models/user";
import { v4 as uuidv4 } from "uuid";
// import { getVerificationTokenByEmail } from "./data/verification-token";

// https://youtu.be/1MTyCvS05V4?si=I2cvfu5RaHvPEHur&t=14065

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  // Expire the token in 3 days
  const expires = new Date(new Date().getTime() + 3600 * 1000 * 24 * 3);

  // const existingToken = await getVerificationTokenByEmail(email);
  // if (existingToken) {
  const filter = { email: email };
  const update = {
    emailVerificationToken: token,
    emailVerificationExpires: expires,
  };
  await User.findOneAndUpdate(filter, update);

  return token;
  // }
};
