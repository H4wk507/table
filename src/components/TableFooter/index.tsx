import { useEffect, ChangeEvent } from "react";
import { RowData } from "../interfaces";
import styles from "./style.module.scss";

const tableRowsPerPage = [10, 20, 50];

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
        {tableRowsPerPage.map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
}
