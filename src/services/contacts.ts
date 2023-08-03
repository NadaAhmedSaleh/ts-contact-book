import mongoose, { isValidObjectId } from "mongoose";
import messages from "../utils/messages";
import isValidPhoneNumber from "../utils/isValidPhoneNumber";
import regExs from "../utils/regExs";
import Contact from "../models/contact";
import validateBirthDate from "../utils/validateBirthDate";
import equalIds from "../utils/equalObjectIds";

/**
 * - adds a new contact in db
 * @param userId - id of user who is adding the contact
 * @param firstName
 * @param lastName
 * @param phoneNumber
 * @param email
 * @param birthDate
 * @returns - status code and success/err message
 */
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
      console.log({ firstName, phoneNumber, email });
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
/**
 * - gets all user's saved contacts
 * @param userId
 * @returns array od user's  contacts
 */
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
/**
 * - gets a specific user contact by id
 * @param userId - id of user who saves this contact
 * @param contactId
 * @returns - status code and err message incase of failure and contact obj incase of success
 */
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
/**
 * - deletes a contact by id
 * @param userId - id of user deleting the contact
 * @param contactId
 * @returns - status code and success/err message
 */
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
