const messages = {
  fieldsNames: {
    phoneNumber: "Phone number",
    email: "Email",
    password: "Password",
  },
  general: {
    missingFieldsErr: "Some required fields are missing!",
    missingFieldErr: (field: string) => `${field} is missing!`,
    invalidErr: (field: string, rules: string) =>
      `${field} is invalid!\n${rules}`,
    notFoundErr: (object: string) => `${object} not found!`,
  },
  users: {
    notMatchingPasswordsErr: "Passwords does't match please recheck!",
    alreadyExists: (field: string, fieldValue: string) =>
      `User with ${field}: ${fieldValue} already exists`,
    signUpSuccess: (fullName: string) =>
      `Welcome ${fullName}!\nyou signed up successfully.`,
    logInErr: (loginField: string) => `Wrong ${loginField} or password!`,
    logInSuccess: (fullName: string) => `Welcome ${fullName} 😄`,
  },
  contacts: {
    alreadyExists: (field: string, fieldValue: string) =>
      `Contact with ${field}: ${fieldValue} already exists`,
    addedSuccess: (firstName: string, lastName: string) =>
      `Contact of ${firstName} ${lastName || ""} added successfully🎉`,
    noContacts: "Your address book is empty!",
    forbiddenErr: (action: string) =>
      `You are not allowed to ${action} this contact!`,
    deleteSuccess: "Contact deleted successfully",
    invalidIdErr: "Invalid contact id",
  },
  fieldsErrs: {
    email:
      "Email should follow the correct email format 'username@example.com'",
    phoneNumber:
      "Phone number should follow the international phone number format '+201234567890'",
    password:
      "Password should follow the following criteria:\n" +
      " 1- Password length has to be between 8 and 12\n" +
      " 2- Password should contain at least one character and one digit.\n",
    birthDate: "BirthDate must be a date in the past in 'YYYY-MM-DD'!",
  },
};
export default messages;
