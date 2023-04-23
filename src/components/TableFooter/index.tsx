import { useEffect, ChangeEvent } from "react";
import { RowData } from "../interfaces";
import styles from "./style.module.scss";

export default function TableFooter({
  range,
  setPage,
  page,
  slice,
  setRowsPerPage,
}: {
  range: number[];
  setPage: (page: number) => void;
  page: number;
  slice: RowData[];
  setRowsPerPage: (rows: number) => void;
}) {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  return (
    <div className={styles["table-footer"]}>
      {range.map((num, idx) => (
        <button
          key={idx}
          className={`${styles.button} ${
            page === num ? styles["active-btn"] : styles["inactive-btn"]
          }`}
          onClick={() => setPage(num)}
        >
          {num}
        </button>
      ))}
      <select onChange={handleChange}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  );
}
