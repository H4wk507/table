import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";

export default function PageNotFound() {
  const { t } = useTranslation();
  return (
    <main className={styles.main}>{"Error 404. " + t("page-not-found")}</main>
  );
}
