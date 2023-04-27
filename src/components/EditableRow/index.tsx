import { ChangeEvent, useState } from "react";
import { RowData, FormData } from "../interfaces";
import { userSchema } from "../../UserValidation";
import ActionButton from "../ActionButton";
import { useDispatch } from "react-redux";
import {
  savePerson,
  markPerson,
  deletePerson,
} from "../../store/reducers/personReducer";
import styles from "./style.module.scss";
import { ValidationError } from "yup";
import { useTranslation } from "react-i18next";
import Checkbox from "../Checkbox";

export default function EditableRow({
  person,
  setEditId,
}: {
  person: RowData;
  setEditId: (id: string | null) => void;
}) {
  const { t } = useTranslation();
  const [rowData, setRowData] = useState(person);
  const [errors, setErrors] = useState<FormData>({});
  const dispatch = useDispatch();

  const handleRowEdit = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowData({
      ...rowData,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = () => {
    userSchema
      .validate(rowData, { abortEarly: false })
      .then(() => {
        dispatch(savePerson({ id: person.id, rowData }));
        setEditId(null);
      })
      .catch((err: ValidationError) => {
        const errors: FormData = {};
        err.inner.forEach((element: ValidationError) => {
          errors[element.path as keyof FormData] = element.message;
        });
        setErrors(errors);
      });
  };

  return (
    <>
      <tr key={person.id}>
        <td data-cell={t("select")}>
          <Checkbox
            checkedPredicate={person.marked}
            onChange={() => dispatch(markPerson({ id: person.id }))}
            className={"checkbox"}
          />
        </td>
        <td data-cell={t("name")}>
          <input
            type="text"
            value={rowData.name}
            onChange={handleRowEdit}
            placeholder={t("name-placeholder") ?? ""}
            name="name"
          />
          {errors.name && (
            <div className={styles["error-text"]}>{t(errors.name)}</div>
          )}
        </td>
        <td data-cell={t("age")}>
          <input
            type="text"
            value={rowData.age}
            onChange={handleRowEdit}
            placeholder={t("age-placeholder") ?? ""}
            name="age"
          />
          {errors.age && (
            <div className={styles["error-text"]}>{t(errors.age)}</div>
          )}
        </td>
        <td data-cell={t("birthdate")}>
          <input
            type="date"
            value={rowData.birthdate}
            onChange={handleRowEdit}
            name="birthdate"
          />
          {errors.birthdate && (
            <div className={styles["error-text"]}>{t(errors.birthdate)}</div>
          )}
        </td>
        <td data-cell={t("biography")}>
          <textarea
            value={rowData.biography}
            onChange={handleRowEdit}
            placeholder={t("biography-placeholder") ?? ""}
            name="biography"
          />
          {errors.biography && (
            <div className={styles["error-text"]}>{t(errors.biography)}</div>
          )}
        </td>
        <td data-cell={t("action")}>
          <ActionButton
            className="delete-row-btn"
            action={() => dispatch(deletePerson({ id: person.id }))}
            btnText={t("delete") ?? ""}
          />
          <ActionButton
            className="save-row-btn"
            action={saveChanges}
            btnText={t("save") ?? ""}
          />
        </td>
      </tr>
    </>
  );
}
