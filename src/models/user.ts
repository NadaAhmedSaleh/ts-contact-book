import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      minLength: 5,
      maxLength: 30,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//------------------------------------------------------------------------------
const User = mongoose.model("User", userSchema);

export default User;
