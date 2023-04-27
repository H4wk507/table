import { object, string, number, date } from "yup";

export const userSchema = object().shape({
  name: string().required("required-field"),
  age: number()
    .required("required-field")
    .typeError("number-error")
    .positive("positive-number-error")
    .integer("whole-number-error"),
  birthdate: date()
    .max(new Date(Date.now()), "future-date")
    .required("required-field")
    .typeError("date-error"),
  biography: string().max(250, "chars-limit"),
});
