import libPhoneNumber from "google-libphonenumber";

function isValidPhoneNumber(phoneNumber: string) {
  const phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance();
  const { PhoneNumberType } = libPhoneNumber;
  try {
    const number = phoneUtil.parseAndKeepRawInput(phoneNumber);
    return (
      phoneUtil.isValidNumber(number) &&
      phoneUtil.getNumberType(number) === PhoneNumberType.MOBILE
    );
  } catch {
    return false;
  }
}
export default isValidPhoneNumber;
