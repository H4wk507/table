import { useEffect } from "react";
import { RowData } from "../interfaces";
import styles from "./style.module.scss";
import TableButtons from "../TableButtons";

export default function TableFooter({
  range,
  setPage,
  page,
  slice,
}: {
  range: number[];
  setPage: (page: number) => void;
  page: number;
  slice: RowData[];
}) {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page]);

  return (
    <div className={styles["table-footer"]}>
      <div>
        <button onClick={() => setPage(1)} className={styles["start-btn"]}>
          &lt;&lt;
        </button>
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className={styles["prev-btn"]}
        >
          &lt;
        </button>
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
        <button
          disabled={page >= range.length}
          onClick={() => setPage(page + 1)}
          className={styles["next-btn"]}
        >
          &gt;
        </button>
        <button
          onClick={() => setPage(range.length === 0 ? 1 : range.length)}
          className={styles["end-btn"]}
        >
          &gt;&gt;
        </button>
      </div>
      <TableButtons />
    </div>
  );
}
