import { object, string, number } from "yup";

export const userSchema = object().shape({
  name: string().required("required-field"),
  age: number()
    .required("required-field")
    .typeError("number-error")
    .positive("positive-number-error")
    .integer("whole-number-error"),
  birthdate: string().required("required-field"),
  biography: string().max(250, "chars-limit"),
});
