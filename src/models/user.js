import mongoose from "mongoose";
import connectDb from "@/config/dbConnection";

/** Connect to mongoDB database */
connectDb();

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the name"],
    },
    email: {
      type: String,
      required: [true, "Please add email address"],
      unique: [true, "Email address already exist"],
    },
    role: {
      type: String,
      enum: ["USER", "PRO_USER", "ADMIN"],
      default: "USER",
    },
    password: {
      type: String,
      require: false,
    },
    provider: {
      type: String,
      require: false,
    },
    image: {
      type: String,
      require: false,
    },
    emailVerified: {
      type: Date,
      require: false,
    },
    // emailVerificationToken: {
    //   type: String,
    //   require: false,
    //   // unique: true,
    // },
    // emailVerificationExpires: {
    //   type: Date,
    //   require: false,
    // },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
