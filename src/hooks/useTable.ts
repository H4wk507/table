import { useEffect, useState } from "react";
import { RowData } from "../components/interfaces";

export function useTable(people: RowData[], page: number, rowsPerPage: number) {
  const [range, setRange] = useState<number[]>([]);
  const [slice, setSlice] = useState<RowData[]>([]);

  const calculateRange = () => {
    const numberOfPages = Math.ceil(people.length / rowsPerPage);
    return Array.from({ length: numberOfPages }, (_, i) => i + 1);
  };

  const slicePeople = () =>
    people.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  useEffect(() => {
    const range = calculateRange();
    const slice = slicePeople();
    setRange([...range]);
    setSlice([...slice]);
  }, [people, page, rowsPerPage]);

  return { slice, range };
}
