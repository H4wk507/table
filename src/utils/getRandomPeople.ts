import { faker } from "@faker-js/faker";

export function getRandomPeople(numberOfSamples: number) {
  return Array.from({ length: numberOfSamples }, () => ({
    id: faker.datatype.uuid(),
    marked: faker.datatype.boolean(),
    name: faker.name.fullName(),
    age: faker.datatype.number({ min: 18, max: 100 }),
    birthdate: faker.date.birthdate().toISOString().slice(0, 10),
    biography: faker.lorem.words(10),
  }));
}
