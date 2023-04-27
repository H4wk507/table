import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RowData } from "../../components/interfaces";

interface Props<T> {
  items: T[];
  renderItem: (item: T, idx: number) => ReactNode;
}

function FourColumnGrid<T>(props: Props<T>) {
  const numberOfColumns = 4;
  const { items, renderItem } = props;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
        gap: "10px",
      }}
    >
      {items.map(renderItem)}
    </div>
  );
}

function MyCustomRender(props: RowData & { idx?: number }) {
  const { idx, ...person } = props;

  return (
    <div style={{ color: "var(--primary-text-color)" }}>
      {`[${idx}]` ?? ""} {person.name} {person.age} {person.birthdate}{" "}
      {person.biography}
    </div>
  );
}

export default function Views() {
  const people = useSelector((state: { people: RowData[] }) => state.people);

  return (
    <FourColumnGrid
      items={people}
      renderItem={(props, idx) => (
        <MyCustomRender key={idx} {...props} idx={idx} />
      )}
    />
  );
}
