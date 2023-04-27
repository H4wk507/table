import { userSchema } from "../../UserValidation";
import styles from "./style.module.scss";
import { useDispatch } from "react-redux";
import { addPerson } from "../../store/reducers/personReducer";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { Ref, forwardRef } from "react";

const EntryForm = forwardRef((_: unknown, ref: Ref<HTMLFormElement>) => {
  const { t } = useTranslation();
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
          id: crypto.randomUUID(),
          marked: false,
          birthdate: formValues.birthdate.toISOString().slice(0, 10),
        }),
      );
      reset();
    }
  };

  return (
    <>
      <form
        tabIndex={-1}
        className={styles.form}
        ref={ref}
        onSubmit={handleSubmit(submitForm)}
      >
        <div className={styles.name}>
          <input
            {...register("name")}
            type="text"
            className={styles["name-field"]}
            placeholder={t("name-placeholder") ?? ""}
          />
          <div className={styles["form-error"]}>
            {t(errors.name?.message as string)}
          </div>
        </div>
        <div className={styles.age}>
          <input
            {...register("age")}
            type="text"
            className={styles["age-field"]}
            placeholder={t("age-placeholder") ?? ""}
          />
          <div className={styles["form-error"]}>
            {t(errors.age?.message as string)}
          </div>
        </div>
        <div className={styles.birthdate}>
          <input
            {...register("birthdate")}
            type="date"
            className={styles["birthdate-field"]}
          />
          <div className={styles["form-error"]}>
            {t(errors.birthdate?.message as string)}
          </div>
        </div>
        <div className={styles.biography}>
          <textarea
            {...register("biography")}
            className={styles["biography-field"]}
            placeholder={t("biography-placeholder") ?? ""}
          />
          <div className={styles["form-error"]}>
            {t(errors.biography?.message as string)}
          </div>
        </div>
        <button className={styles["submit-form-btn"]}>{t("submit")}</button>
      </form>
    </>
  );
});

export default EntryForm;
