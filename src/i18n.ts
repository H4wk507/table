import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        "delete-marked": "Delete marked records",
        "new-record": "New record",
        "name-placeholder": "Name...",
        "age-placeholder": "Age...",
        "biography-placeholder": "Biography... Character limit: 250",
        delete: "Delete",
        save: "Save",
        submit: "Submit",
        name: "Name",
        age: "Age",
        birthdate: "Birthdate",
        biography: "Biography",
        action: "Action",
        edit: "Edit",
        "page-not-found": "This is not the page you are looking for.",
        "required-field": "Required field",
        "number-error": "Must be a number",
        "positive-number-error": "Must be a positive number",
        "whole-number-error": "Must be a whole number",
        "chars-limit": "Exceeded maximum number of characters",
        language: "Language",
      },
    },
    pl: {
      translation: {
        "delete-marked": "Usuń zaznaczone rekordy",
        "new-record": "Nowy rekord",
        "name-placeholder": "Imię...",
        "age-placeholder": "Age...",
        "biography-placeholder": "Życiorys... Limit znaków: 250",
        delete: "Usuń",
        save: "Zapisz",
        submit: "Zatwierdź",
        name: "Imię",
        age: "Wiek",
        birthdate: "Data urodzenia",
        biography: "Życiorys",
        action: "Akcja",
        edit: "Edytuj",
        "page-not-found": "To nie jest strona, której szukasz.",
        "required-field": "Wymagane pole",
        "number-error": "Musi być liczbą",
        "positive-number-error": "Musi być liczbą dodatnią",
        "whole-number-error": "Musi być liczbą całkowitą",
        "chars-limit": "Przekroczono maksymalną liczbę znaków",
        language: "Język",
      },
    },
  },
});

export default i18n;
