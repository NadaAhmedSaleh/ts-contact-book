import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
});

//------------------------------------------------------------------------------
const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
