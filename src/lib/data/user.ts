import User from "@/models/user";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    if (user?.emailVerificationToken) {
      return user;
    }
    return null;
  } catch {
    return null;
  }
};
