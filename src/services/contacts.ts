import mongoose, { isValidObjectId } from "mongoose";
import moment from "moment";
import messages from "../utils/messages";
import isValidPhoneNumber from "../utils/isValidPhoneNumber";
import regExs from "../utils/regExs";
import Contact from "../models/contact";
import validateBirthDate from "../utils/validateBirthDate";
import equalIds from "../utils/equalObjectIds";

const addContact = async (
  userId: mongoose.Types.ObjectId,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  birthDate: string
) => {
  try {
    if (!firstName || (!phoneNumber && !email)) {
      // user should enter at least one of phoneNumber or email to save in the contact
      return { status: 400, message: messages.general.missingFieldsErr };
    }
    // validate on inputs
    if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
      return {
        status: 400,
        message: messages.general.invalidErr(
          "Phone number",
          messages.fieldsErrs.phoneNumber
        ),
      };
    }
    if (email && !new RegExp(regExs.email).test(email)) {
      return {
        status: 400,
        message: messages.general.invalidErr(
          "Email",
          messages.fieldsErrs.email
        ),
      };
    }

    let momentBirthDate;
    if (birthDate) {
      const { isValid, inputDate } = validateBirthDate(birthDate);
      if (!isValid) {
        return {
          status: 400,
          message: messages.general.invalidErr(
            "BirthDate",
            messages.fieldsErrs.birthDate
          ),
        };
      }
      momentBirthDate = inputDate;
    }
    // check that no already saved contact with this email or number
    let contact;
    if (email) {
      contact = await Contact.findOne({ email, userId }).lean();
      if (contact) {
        return {
          status: 400,
          message: messages.contacts.alreadyExists("email", email),
        };
      }
    }
    if (phoneNumber) {
      contact = await Contact.findOne({ phoneNumber, userId }).lean();
      if (contact) {
        return {
          status: 400,
          message: messages.contacts.alreadyExists("phone number", phoneNumber),
        };
      }
    }

    contact = new Contact({
      userId,
      firstName,
      lastName,
      phoneNumber,
      email,
      birthDate: momentBirthDate,
    });
    await contact.save();
    return {
      status: 200,
      message: messages.contacts.addedSuccess(firstName, lastName),
    };
  } catch (err) {
    return { status: 400, message: err };
  }
};
//------------------------------------------------------------------------------
const getUserContacts = async (userId: mongoose.Types.ObjectId) => {
  try {
    const contacts = await Contact.find({ userId }).lean();
    if (contacts.length === 0)
      return { status: 200, message: messages.contacts.noContacts };
    return { status: 200, contacts };
  } catch (err) {
    return { status: 400, message: err };
  }
};
//------------------------------------------------------------------------------
const getContactById = async (
  userId: mongoose.Types.ObjectId,
  contactId: string
) => {
  if (!isValidObjectId(contactId)) {
    return { status: 400, message: messages.contacts.invalidIdErr };
  }
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return { status: 404, message: messages.general.notFoundErr("Contact") };
    }

    if (!equalIds(contact.userId, userId)) {
      return { status: 403, message: messages.contacts.forbiddenErr("view") };
    }
    return { status: 200, contact };
  } catch (err) {
    return { status: 400, message: err };
  }
};
//------------------------------------------------------------------------------
const deleteContactById = async (
  userId: mongoose.Types.ObjectId,
  contactId: string
) => {
  if (!isValidObjectId(contactId)) {
    return { status: 400, message: messages.contacts.invalidIdErr };
  }
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return { status: 404, message: messages.general.notFoundErr("Contact") };
    }
    if (!equalIds(contact.userId, userId)) {
      return { status: 403, message: messages.contacts.forbiddenErr("delete") };
    }
    await Contact.deleteOne({ _id: contactId });
    return { status: 200, message: messages.contacts.deleteSuccess };
  } catch (err) {
    return { status: 400, message: err };
  }
};
//------------------------------------------------------------------------------

export { addContact, getUserContacts, getContactById, deleteContactById };
