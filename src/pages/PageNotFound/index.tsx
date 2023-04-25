import { useTranslation } from "react-i18next";

export default function PageNotFound() {
  const { t } = useTranslation();
  return <div>{"404. " + t("page-not-found")}</div>;
}
