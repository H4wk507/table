import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RowData } from "../../components/interfaces";

interface Props<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

function FourColumnGrid<T>(props: Props<T>) {
  const numberOfItemsInRow = 4;
  const { items, renderItem } = props;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numberOfItemsInRow}, 1fr)`,
        gap: "8px",
      }}
    >
      {items.map((item) => renderItem(item))}
    </div>
  );
}

export default function Views() {
  const people = useSelector((state: { people: RowData[] }) => state.people);
  const myCustomRender = (person: RowData) => (
    <div>
      {person.name} {person.age} {person.birthdate} {person.biography}
    </div>
  );

  return <FourColumnGrid items={people} renderItem={myCustomRender} />;
}
