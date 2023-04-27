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
        select: "Select",
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
        "future-date": "Date cannot be in the future",
        "date-error": "Invalid date",
        "chars-limit": "Exceeded maximum number of characters (250)",
        "add-new-record": "Add new record",
        language: "Language",
        show: "Show",
        records: "records",
      },
    },
    pl: {
      translation: {
        "delete-marked": "Usuń zaznaczone rekordy",
        "new-record": "Nowy rekord",
        "name-placeholder": "Imię...",
        "age-placeholder": "Wiek...",
        "biography-placeholder": "Życiorys... Limit znaków: 250",
        delete: "Usuń",
        save: "Zapisz",
        submit: "Zatwierdź",
        select: "Zaznacz",
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
        "date-error": "Nieprawidłowa data",
        "future-date": "Data nie może być z przyszłości",
        "chars-limit": "Przekroczono maksymalną liczbę znaków (250)",
        "add-new-record": "Dodaj nowy rekord",
        language: "Język",
        show: "Pokaż",
        records: "rekordów",
      },
    },
  },
});

export default i18n;
