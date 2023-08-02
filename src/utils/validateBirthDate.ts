import moment from "moment";
function validateBirthDate(birthDate: string) {
  if (!moment(birthDate, "YYYY-MM-DD", true).isValid())
    return { isValid: false };
  const inputDate = moment(birthDate, "YYYY-MM-DD");
  if (!inputDate.isBefore(moment())) return { isValid: false };
  return { isValid: true, inputDate };
}
export default validateBirthDate;
