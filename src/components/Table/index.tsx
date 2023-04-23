import HeaderRow from "../HeaderRow";
import EditableRow from "../EditableRow";
import ReadOnlyRow from "../ReadOnlyRow";
import React, { useState } from "react";
import styles from "./style.module.scss";
import { useTable } from "../../hooks/useTable";
import TableFooter from "../TableFooter";
import { useSelector } from "react-redux";
import { RowData } from "../interfaces";

export default function TableData() {
  const people = useSelector((state: { people: RowData[] }) => state.people);
  const [editId, setEditId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { slice, range } = useTable(people, page, rowsPerPage);

  return (
    <>
      <table className={styles.table}>
        <thead>
          <HeaderRow />
        </thead>
        <tbody>
          {slice.map((person) => (
            <React.Fragment key={person.id}>
              {person.id === editId ? (
                <EditableRow
                  key={person.id}
                  person={person}
                  setEditId={setEditId}
                />
              ) : (
                <ReadOnlyRow
                  key={person.id}
                  person={person}
                  setEditId={setEditId}
                />
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <TableFooter
        range={range}
        slice={slice}
        setPage={setPage}
        page={page}
        setRowsPerPage={setRowsPerPage}
      />
    </>
  );
}
