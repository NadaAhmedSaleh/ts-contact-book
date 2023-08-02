const messages = {
  general: {
    missingFieldErr: (field: string) => `${field} is missing!`,
    invalidErr: (field: string, rules: string) =>
      `${field} is invalid!\n${rules}`,
  },
  regexErrs: {
    email:
      "Email should follow the correct email format 'username@example.com'",
    phoneNumber:
      "Phone number should follow the international phone number format '+201234567890'",
    password:
      "Password should follow the following criteria:\n" +
      " 1- Password length has to be between 8 and 12\n" +
      " 2- Password can only contain upper and lower cases english alphabet, special characters including '@ $ ! % * ? &' in addition to english numbers.\n" +
      " 3- Password should contain at least one upper case character, one lower case character, one special character and one number.\n",
  },
};
export default messages;
