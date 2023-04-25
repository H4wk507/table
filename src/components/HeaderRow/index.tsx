import { useTranslation } from "react-i18next";

export default function HeaderRow() {
  const { t } = useTranslation();

  return (
    <tr>
      <th></th>
      <th>{t("name")}</th>
      <th>{t("age")}</th>
      <th>{t("birthdate")}</th>
      <th>{t("biography")}</th>
      <th>{t("action")}</th>
    </tr>
  );
}
