import mongoose from "mongoose";
import User from "./user";

const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
      index: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

//------------------------------------------------------------------------------
const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
