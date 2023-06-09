import { faker } from "@faker-js/faker";
import { RowData } from "../components/interfaces";

export function getRandomPeople(numberOfSamples: number): RowData[] {
  let id = 0;
  return Array.from({ length: numberOfSamples }, () => ({
    id: id++,
    marked: false,
    name: faker.name.fullName(),
    age: faker.datatype.number({ min: 18, max: 100 }),
    birthdate: faker.date.birthdate().toISOString().slice(0, 10),
    biography: faker.lorem.words(10),
  }));
}
