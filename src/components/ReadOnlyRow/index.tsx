import { useDispatch } from "react-redux";
import { stripLongString } from "../../utils/stripLongString";
import ActionButton from "../ActionButton";
import { RowData } from "../interfaces";
import { deletePerson, markPerson } from "../../store/reducers/personReducer";
import { useTranslation } from "react-i18next";
import Checkbox from "../Checkbox";

export default function ReadOnlyRow({
  person,
  setEditId,
}: {
  person: RowData;
  setEditId: (id: string | null) => void;
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const strippedBiography = stripLongString(person.biography);

  return (
    <tr key={person.id}>
      <td data-cell={t("select")}>
        <Checkbox
          checkedPredicate={person.marked}
          onChange={() => dispatch(markPerson({ id: person.id }))}
          className={"checkbox"}
        />
      </td>
      <td data-cell={t("name")}>{person.name}</td>
      <td data-cell={t("age")}>{person.age}</td>
      <td data-cell={t("birthdate")}>{person.birthdate}</td>
      <td data-cell={t("biography")}>{strippedBiography}</td>
      <td data-cell={t("action")}>
        <ActionButton
          className="delete-row-btn"
          action={() => dispatch(deletePerson({ id: person.id }))}
          btnText={t("delete") ?? ""}
        />
        <ActionButton
          className="edit-row-btn"
          action={() => setEditId(person.id)}
          btnText={t("edit") ?? ""}
        />
      </td>
    </tr>
  );
}
