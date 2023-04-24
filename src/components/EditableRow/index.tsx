import { ChangeEvent, useState } from "react";
import { RowData } from "../interfaces";
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
import { FormData } from "../interfaces";

// TODO: declare a new type for props to avoid pollution
export default function EditableRow({
  person,
  setEditId,
}: {
  person: RowData;
  setEditId: (id: string | null) => void;
}) {
  const [rowData, setRowData] = useState(person);
  const [errors, setErrors] = useState<FormData>({});
  const dispatch = useDispatch();

  const handleRowEdit = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        <td>
          <input
            type="checkbox"
            checked={person.marked}
            onChange={() => dispatch(markPerson({ id: person.id }))}
          />
        </td>
        <td>
          <input
            type="text"
            value={rowData.name}
            onChange={handleRowEdit}
            placeholder="Imię..."
            name="name"
          />
          {errors.name && (
            <div className={styles["error-text"]}>{errors.name}</div>
          )}
        </td>
        <td>
          <input
            type="text"
            value={rowData.age}
            onChange={handleRowEdit}
            placeholder="Wiek..."
            name="age"
          />
          {errors.age && (
            <div className={styles["error-text"]}>{errors.age}</div>
          )}
        </td>
        <td>
          <input
            type="text"
            value={rowData.birthdate}
            onChange={handleRowEdit}
            name="birthdate"
          />
          {errors.birthdate && (
            <div className={styles["error-text"]}>{errors.birthdate}</div>
          )}
        </td>
        <td>
          <textarea
            value={rowData.biography}
            onChange={handleRowEdit}
            placeholder="Życiorys... Limit znaków: 250"
            name="biography"
          />
          {errors.biography && (
            <div className={styles["error-text"]}>{errors.biography}</div>
          )}
        </td>
        <td>
          <ActionButton
            className="delete-row-btn"
            action={() => dispatch(deletePerson({ id: person.id }))}
            btnText="Usuń"
          />
          <ActionButton
            className="save-row-btn"
            action={saveChanges}
            btnText="Zapisz"
          />
        </td>
      </tr>
    </>
  );
}
