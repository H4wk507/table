import TableData from "../../components/Table";
import EntryForm from "../../components/EntryForm";
import styles from "./style.module.scss";
import { useDispatch } from "react-redux";
import { deleteMarkedPeople } from "../../store/reducers/personReducer";

export default function Main() {
  const dispatch = useDispatch();

  const deleteMarkedRows = () => {
    dispatch(deleteMarkedPeople());
  };

  return (
    <main className={styles.main}>
      <TableData />
      <button
        className={styles["delete-marked-btn"]}
        onClick={deleteMarkedRows}
      >
        Usuń zaznaczone rekordy
      </button>
      <div className={styles["new-record-text"]}>Dodaj nowy rekord</div>
      <EntryForm />
    </main>
  );
}
