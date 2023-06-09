export interface Person {
  name: string;
  age: number;
  birthdate: string;
  biography: string;
}

export interface RowData extends Person {
  id: number;
  marked: boolean;
}

export type FormData = Partial<Person>;
