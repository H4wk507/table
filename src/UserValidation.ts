import { object, string, number } from "yup";

export const userSchema = object().shape({
  name: string().required("Wymagane"),
  age: number().required("Wymagane").positive().integer(),
  birthdate: string().required("Wymagane"),
  biography: string().max(250),
});
