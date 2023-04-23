export function getRandomPeople(numberOfSamples: number) {
  const people = [];
  for (let i = 0; i < numberOfSamples; i++) {
    people.push({
      id: crypto.randomUUID(),
      marked: false,
      name: getRandomName(),
      age: getRandomAge().toString(),
      birthdate: getRandomBirthDate(),
      biography: getRandomBio(),
    });
  }
  return people;
}

function getRandomName() {
  const names = [
    "Anna",
    "Katarzyna",
    "Tomasz",
    "Paweł",
    "Jan",
    "Aleksandra",
    "Mateusz",
    "Karolina",
    "Dominika",
    "Maciej",
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomAge() {
  return Math.floor(Math.random() * 50) + 18;
}

function getRandomBirthDate() {
  const start = new Date(1970, 0, 1);
  const end = new Date();
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomDate.toISOString().slice(0, 10);
}

function getRandomBio() {
  const bios = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "In hac habitasse platea dictumst.",
    "Etiam eu mauris nec magna pharetra ullamcorper.",
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    "Duis sit amet ante vel odio accumsan imperdiet a at sapien.",
  ];
  return bios[Math.floor(Math.random() * bios.length)];
}
