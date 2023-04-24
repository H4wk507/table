import { userSchema } from "../../UserValidation";
import styles from "./style.module.scss";
import { useDispatch } from "react-redux";
import { addPerson } from "../../store/reducers/personReducer";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function EntryForm() {
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(userSchema),
  });
  const { errors } = formState;
  const dispatch = useDispatch();

  const submitForm = async (formValues: FieldValues) => {
    const isValidForm = await userSchema.isValid(formValues);
    if (isValidForm) {
      dispatch(
        addPerson({
          ...formValues,
          marked: false,
          id: crypto.randomUUID(),
        })
      );
      reset();
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
        <div className={styles.name}>
          <input
            {...register("name")}
            type="text"
            className={styles["name-field"]}
            placeholder="Imię..."
          />
          <div className={styles["form-error"]}>
            {errors.name?.message as string}
          </div>
        </div>
        <div className={styles.age}>
          <input
            {...register("age")}
            type="text"
            className={styles["age-field"]}
            placeholder="Wiek..."
          />
          <div className={styles["form-error"]}>
            {errors.age?.message as string}
          </div>
        </div>
        <div className={styles.birthdate}>
          <input
            {...register("birthdate")}
            type="date"
            className={styles["birthdate-field"]}
          />
          <div className={styles["form-error"]}>
            {errors.birthdate?.message as string}
          </div>
        </div>
        <div className={styles.biography}>
          <textarea
            {...register("biography")}
            className={styles["biography-field"]}
            placeholder="Życiorys... Limit znaków: 250"
          />
          <div className={styles["form-error"]}>
            {errors.biography?.message as string}
          </div>
        </div>
        <button className={styles["submit-form-btn"]}>Zatwierdź</button>
      </form>
    </>
  );
}
