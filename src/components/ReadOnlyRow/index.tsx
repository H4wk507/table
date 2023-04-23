import { useDispatch } from "react-redux";
import { stripLongString } from "../../utils/stripLongString";
import ActionButton from "../ActionButton";
import { RowData } from "../interfaces";
import { deletePerson, markPerson } from "../../store/reducers/personReducer";

export default function ReadOnlyRow({
  person,
  setEditId,
}: {
  person: RowData;
  setEditId: (id: string | null) => void;
}) {
  const dispatch = useDispatch();
  const strippedBiography = stripLongString(person.biography);

  return (
    <tr key={person.id}>
      <td>
        <input
          type="checkbox"
          checked={person.marked}
          onChange={() => dispatch(markPerson({ id: person.id }))}
        />
      </td>
      <td>{person.name}</td>
      <td>{person.age}</td>
      <td>{person.birthdate}</td>
      <td>{strippedBiography}</td>
      <td>
        <ActionButton
          className="delete-row-btn"
          action={() => dispatch(deletePerson({ id: person.id }))}
          btnText="Usuń"
        />
        <ActionButton
          className="edit-row-btn"
          action={() => setEditId(person.id)}
          btnText="Edytuj"
        />
      </td>
    </tr>
  );
}
