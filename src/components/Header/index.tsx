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
      <a onClick={() => navigate("/main")}>main</a>
      <a onClick={() => navigate("/views")}>views</a>
      <div>
        {t("language")}
        <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
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
