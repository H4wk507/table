import { object, string, number } from "yup";

export const userSchema = object().shape({
  name: string().required("Wymagane pole"),
  age: number()
    .required("Wymagane pole")
    .typeError("Podaj liczbę")
    .positive("Podaj dodatnią liczbę")
    .integer("Podaj liczbę całkowitą"),
  birthdate: string().required("Wymagane pole"),
  biography: string().max(250, "Przekroczono maksymalną liczbę znaków (250)"),
});
