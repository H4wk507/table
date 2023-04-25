import TableData from "../../components/Table";
import EntryForm from "../../components/EntryForm";
import styles from "./style.module.scss";
import { useDispatch } from "react-redux";
import { deleteMarkedPeople } from "../../store/reducers/personReducer";
import { useTranslation } from "react-i18next";

export default function Main() {
  const { t } = useTranslation();
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
        {t("delete-marked")}
      </button>
      <div className={styles["new-record-text"]}>{t("new-record")}</div>
      <EntryForm />
    </main>
  );
}
