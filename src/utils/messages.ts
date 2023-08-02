const messages = {
  general: {
    missingFieldsErr: "Some required fields are missing!",
    missingFieldErr: (field: string) => `${field} is missing!`,
    invalidErr: (field: string, rules: string) =>
      `${field} is invalid!\n${rules}`,
  },
  users: {
    notMatchingPasswordsErr: "Passwords does't match please recheck!",
    alreadyExists: (field: string, fieldValue: string) =>
      `User with ${field}: ${fieldValue} already exists`,
    signUpSuccess: (fullName: string) =>
      `Welcome ${fullName}!\nyou signed up successfully.`,
  },
  regexErrs: {
    email:
      "Email should follow the correct email format 'username@example.com'",
    phoneNumber:
      "Phone number should follow the international phone number format '+201234567890'",
    password:
      "Password should follow the following criteria:\n" +
      " 1- Password length has to be between 8 and 12\n" +
      " 2- Password should contain at least one character and one digit.\n",
  },
};
export default messages;
