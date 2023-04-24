export interface Person {
  name: string;
  age: string;
  birthdate: string;
  biography: string;
}

export interface RowData extends Person {
  id: string;
  marked: boolean;
}

export type FormData = Partial<Person>;
