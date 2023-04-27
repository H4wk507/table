import HeaderRow from "../HeaderRow";
import EditableRow from "../EditableRow";
import ReadOnlyRow from "../ReadOnlyRow";
import React, { ChangeEvent, useState } from "react";
import styles from "./style.module.scss";
import { useTable } from "../../hooks/useTable";
import TableFooter from "../TableFooter";
import { useSelector } from "react-redux";
import { RowData } from "../interfaces";
import { useTranslation } from "react-i18next";

const tableRowsPerPage = [10, 20, 50];

export default function Table() {
  const people = useSelector((state: { people: RowData[] }) => state.people);
  const { t } = useTranslation();
  const [editId, setEditId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { slice, range } = useTable(people, page, rowsPerPage);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  // TODO: check smaller action buttons

  return (
    <>
      <div className={styles["selection-wrapper"]}>
        {t("show")}
        <select className={styles["rows-selection"]} onChange={handleChange}>
          {tableRowsPerPage.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {t("records")}
      </div>
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
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
}
