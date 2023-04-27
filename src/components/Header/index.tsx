import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import { useTranslation } from "react-i18next";

const languages = {
  en: "English",
  pl: "Polski",
};

export default function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles["links-container"]}>
        <a className={styles.link} onClick={() => navigate("/main")}>
          main
        </a>
        <a className={styles.link} onClick={() => navigate("/views")}>
          views
        </a>
      </div>
      <div className={styles["language-container"]}>
        {t("language")}
        <select
          className={styles["language-selection"]}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          {Object.entries(languages).map(([locale, name]) => (
            <option key={locale} value={locale}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
