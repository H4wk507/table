import { ChangeEvent, FormEvent, useState } from "react";
import { userSchema } from "../../UserValidation";
import styles from "./style.module.scss";
import { useDispatch } from "react-redux";
import { addPerson } from "../../store/reducers/personReducer";
import { useForm } from "react-hook-form";

export default function EntryForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    birthdate: "",
    biography: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { register, control } = useForm();
  const dispatch = useDispatch();

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    const isValidForm = await userSchema.isValid(formData);
    if (isValidForm) {
      dispatch(
        addPerson({
          ...formData,
          marked: false,
          id: crypto.randomUUID(),
        })
      );
      setFormData({ name: "", age: "", birthdate: "", biography: "" });
      setError(null);
    } else {
      setError("Nieprawidłowe dane!");
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={submitForm}>
        <input
          type="text"
          name="name"
          className={styles.name}
          value={formData.name}
          onChange={handleFormChange}
          placeholder="Imię..."
        />
        <input
          type="text"
          name="age"
          className={styles.age}
          value={formData.age}
          onChange={handleFormChange}
          placeholder="Wiek..."
        />
        <input
          type="date"
          name="birthdate"
          className={styles.birthdate}
          value={formData.birthdate}
          onChange={handleFormChange}
          placeholder="Data urodzenia..."
        />
        <textarea
          name="biography"
          className={styles.biography}
          value={formData.biography}
          onChange={handleFormChange}
          placeholder="Życiorys... Limit znaków: 250"
        />
        <button className={styles["submit-form-btn"]}>Zatwierdź</button>
      </form>
      {error && <div>{error}</div>}
    </>
  );
}
