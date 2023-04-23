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

// TODO: declare a new type for props to avoid pollution
export default function EditableRow({
  person,
  setEditId,
}: {
  person: RowData;
  setEditId: (id: string | null) => void;
}) {
  const [rowData, setRowData] = useState(person);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleRowEdit = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowData({
      ...rowData,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = async () => {
    const isValid = await userSchema.isValid(rowData);
    if (isValid) {
      dispatch(savePerson({ id: person.id, rowData }));
      setEditId(null);
      setError(null);
    } else {
      setError("Nieprawidłowe dane");
    }
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
            required
            placeholder="enter a name"
            name="name"
          />
        </td>
        <td>
          <input
            type="text"
            value={rowData.age}
            onChange={handleRowEdit}
            required
            placeholder="enter a age"
            name="age"
          />
        </td>
        <td>
          <input
            type="text"
            value={rowData.birthdate}
            onChange={handleRowEdit}
            required
            placeholder="enter a birthday"
            name="birthday"
          />
        </td>
        <td>
          <textarea
            value={rowData.biography}
            onChange={handleRowEdit}
            required
            placeholder="enter a biography"
            name="biography"
          />
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
      {error && <div>{error}</div>}
    </>
  );
}
