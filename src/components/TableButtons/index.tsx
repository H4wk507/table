import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { deleteMarkedPeople } from "../../store/reducers/personReducer";
import Modal from "@mui/material/Modal";
import styles from "./style.module.scss";
import { useState } from "react";
import EntryForm from "../EntryForm";

export default function TableButtons() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const deleteMarkedRows = () => {
    dispatch(deleteMarkedPeople());
  };

  return (
    <div className={styles.buttons}>
      <button
        className={styles["delete-marked-btn"]}
        onClick={deleteMarkedRows}
      >
        {t("delete-marked")}
      </button>
      <button className={styles["new-record-btn"]} onClick={handleOpen}>
        {t("add-new-record")}
      </button>
      <Modal
        tabIndex={4}
        className={styles.modal}
        open={open}
        onClose={handleClose}
      >
        <EntryForm />
      </Modal>
    </div>
  );
}
